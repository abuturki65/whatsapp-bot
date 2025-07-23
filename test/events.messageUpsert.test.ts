import { eventHandler } from "../src/socket/events/messageUpsertHandler";
import test from "node:test";
import assert from "node:assert";
import {
    MessageArea,
    MessageRoles,
    MessageType,
} from "../src/enums/enums";
import {
    SorenCommandMeta,
    SorenSocketType,
} from "../src/types/types";
import { BaileysEventMap } from "baileys";

test("message upsert event handler function", async (t) => {
    const commands = new Map<string, string | SorenCommandMeta>();
    commands.set("p", "ping");
    commands.set("ping", {
        commandKey: ["p", "ping"],
        commandArea: [MessageArea.GroupMessage],
        commandMessageType: [MessageType.TextMessage],
        commandRoles: [MessageRoles.Personal],
        commandHandler: (socket) => async (args) => {},
    });

    const socketMock = {
        commands,
        config: {
            SOREN_BOT_OWNER: "123456789",
            SOREN_COMMAND_PREFIX: ["/"],
        },
    } as unknown as SorenSocketType;
    const GeneralError = {
        name: "GeneralError",
        message: "",
    };

    await t.test("message type != notify", async () => {
        GeneralError.message = "Unexpected message type received expected 'notify'";
        const snapshotListener = {
            messages: [{
                message: {},
                key: undefined,
            }],
            type: "append",
        } as unknown as BaileysEventMap["messages.upsert"];

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });

    await t.test("message is undefined", async () => {
        GeneralError.message = "Unexpected behavior, message from message object is undefined";
        const snapshotListener = {
            messages: [{
                message: undefined,
                key: undefined,
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });

    await t.test("received message type is unlisted", async () => {
        GeneralError.message = "Client is received unsupported message type";
        const snapshotListener = {
            messages: [{
                message: {},
                key: undefined,
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });

    await t.test("remotejid is undefined or message area is undefined", async () => {
        GeneralError.message = "Cannot define message area value. found undefined";
        const snapshotListener = {
            messages: [{
                message: {
                    conversation: "hello",
                },
                key: {
                    remoteJid: undefined,
                },
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });

    await t.test("the prefix is not match", async () => {
        const snapshotListener = {
            messages: [{
                message: {
                    conversation: "!hello",
                },
                key: {
                    remoteJid: "123456789",
                },
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];

        const returnValue = await eventHandler(socketMock)(snapshotListener);
        assert.equal(returnValue, null);
    });

    await t.test("command is unlisted", async () => {
        const snapshotListener = {
            messages: [{
                message: {
                    conversation: "/test",
                },
                key: {
                    remoteJid: "123456789",
                },
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];
        const command = snapshotListener.messages[0].message?.conversation?.slice(1);
        GeneralError.message = `Unsupported command '${command}' received`;

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });

    await t.test("allowed area", async () => {
        const snapshotListener = {
            messages: [{
                message: {
                    conversation: "/p",
                },
                key: {
                    remoteJid: "123456789",
                },
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        let command = socketMock.commands.get(snapshotListener.messages[0].message?.conversation?.slice(1)!);

        if (!command) {
            throw new Error("Command is undefined");
        }

        if (typeof command === "string") {
            command = <SorenCommandMeta> socketMock.commands.get(command);
        }

        GeneralError.message = `Allowed area ${command.commandArea}`;

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });

    await t.test("allowed roles", async () => {
        const snapshotListener = {
            messages: [{
                message: {
                    conversation: "/p",
                },
                key: {
                    remoteJid: "123456789",
                },
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        let command = socketMock.commands.get(snapshotListener.messages[0].message?.conversation?.slice(1)!);

        if (!command) {
            throw new Error("Command is undefined");
        }

        if (typeof command === "string") {
            command = <SorenCommandMeta> socketMock.commands.get(command);
        }
        command.commandRoles = [MessageRoles.BotOwner];
        command.commandArea = [MessageArea.PersonalMessage];
        GeneralError.message = `Allowed roles ${command.commandRoles}`;

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });

    await t.test("allowed types", async () => {
        const snapshotListener = {
            messages: [{
                message: {
                    conversation: "/p",
                },
                key: {
                    remoteJid: "123456789@s.whatsapp.net",
                },
            }],
            type: "notify",
        } as unknown as BaileysEventMap["messages.upsert"];
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        let command = socketMock.commands.get(snapshotListener.messages[0].message?.conversation?.slice(1)!);

        if (!command) {
            throw new Error("Command is undefined");
        }

        if (typeof command === "string") {
            command = <SorenCommandMeta> socketMock.commands.get(command);
        }

        command.commandMessageType = [MessageType.LocationMessage];
        GeneralError.message = `Allowed message type ${command.commandMessageType}`;

        await assert.rejects(
            async () => {
                await eventHandler(socketMock)(snapshotListener);
            },
            GeneralError,
        );
    });
});
