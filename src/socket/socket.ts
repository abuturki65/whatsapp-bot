import {
    BaileysEventMap,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    makeWASocket,
    useMultiFileAuthState,
    UserFacingSocketConfig,
} from "baileys";
import qrcode from "qrcode";
import { config } from "@/config/config";
import {
    SorenCommandMeta,
    SorenSocketOptions,
    SorenSocketType,
} from "@/types/types";
import { logger } from "@/lib/logger/logger";
import { Boom } from "@hapi/boom";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { getEventHandlers } from "@/socket/events";

export class SorenSocket {
    private sessionName: string;

    constructor(socketOptions?: SorenSocketOptions) {
        this.sessionName = socketOptions?.sessionName || config.SOREN_SESSION;
    }

    public async initialize() {
        const { state, saveCreds } = await useMultiFileAuthState(this.sessionName);
        const socketConfiguration: UserFacingSocketConfig = {
            logger,
            markOnlineOnConnect: true,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger),
            },
        };

        const events = await getEventHandlers();

        const socket: SorenSocketType = makeWASocket(socketConfiguration);
        socket.commands = await this.commandDispatcher();

        socket.ev.on("creds.update", saveCreds);
        socket.ev.on("connection.update", this.connectionHandler.bind(this));
        events.forEach((ev) => socket.ev.on(ev.eventKey, ev.eventHandler(socket)));
    }

    public async connectionHandler(listener: BaileysEventMap["connection.update"]) {
        const { connection, lastDisconnect, qr } = listener;

        if (qr) {
            console.log(
                await qrcode.toString(qr, {
                    type: "terminal",
                    small: true,
                }),
            );
        }

        if (connection === "close") {
            if ((lastDisconnect?.error as Boom)?.output.statusCode !== DisconnectReason.loggedOut) {
                this.initialize();
            }
        }
    }

    public async commandDispatcher(): Promise<Map<string, SorenCommandMeta["commandHandler"]>> {
        const commandPool = new Map();

        const commandDirectoryList = await readdir(
            config.SOREN_COMMAND_DIRECTORY,
        );

        const commandMapperFunction = async (commandCategoryDir: string) => {
            const commandCategoryDirpath = [
                config.SOREN_COMMAND_DIRECTORY,
                commandCategoryDir,
            ];

            const commandFiles = await readdir(
                path.join(...commandCategoryDirpath),
            );

            const commandFileHandler = await Promise.all(commandFiles.map(
                async (filename) => {
                    const commandPool: SorenSocketType["commands"] = new Map();
                    const fullCommandFilepath = path.join(
                        ...commandCategoryDirpath,
                        filename,
                    );

                    const commandMetaObject: SorenCommandMeta = await import(fullCommandFilepath);

                    let commandParent: string;

                    if (Array.isArray(commandMetaObject.commandKey)) {
                        commandMetaObject.commandKey.forEach((commandKey) => {
                            commandPool.set(
                                commandKey,
                                commandParent ? commandParent : commandMetaObject.commandHandler,
                            );

                            if (!commandParent) {
                                commandParent = commandKey;
                            }
                        });
                    } else {
                        commandPool.set(commandMetaObject.commandKey, commandMetaObject.commandHandler);
                    }

                    return commandPool;
                },
            ));

            return commandFileHandler;
        };

        const commandHandlerMap = await Promise.all(commandDirectoryList.map(commandMapperFunction));
        const commandHandlers = commandHandlerMap.flat();

        commandHandlers.forEach((command) => {
            command.forEach((val, key) => commandPool.set(key, val));
        });

        return commandPool;
    }
}
