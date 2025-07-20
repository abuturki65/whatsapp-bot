import {
    MessageArea,
    MessageRoles,
    MessageType,
} from "@/enums/enums";
import {
    BaileysEventMap,
    makeWASocket,
} from "baileys";

export type SorenSocketOptions = {
    sessionName: string;
};

export type SorenEventMeta = {
    eventKey: keyof BaileysEventMap;
    eventHandler: (socket: SorenSocketType) => (listener: BaileysEventMap[keyof BaileysEventMap]) => void;
};

export type SorenCommandMeta = {
    commandKey: string | string[];
    commandRoles: MessageRoles[];
    commandArea: MessageArea[];
    commandMessageType: MessageType;
    commandHandler: (socket: SorenSocketType) => (args: string[]) => Promise<unknown>;
};

export type SorenSocketType = {
    commands?: Map<string, string | SorenCommandMeta>;
} & ReturnType<typeof makeWASocket>;
