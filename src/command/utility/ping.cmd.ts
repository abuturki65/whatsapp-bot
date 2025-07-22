import {
    MessageArea,
    MessageRoles,
    MessageType,
} from "@/enums/enums";
import { SorenCommandMeta } from "@/types/types";

const commandKey: string | string[] = ["ping", "p"];

const commandRoles: MessageRoles[] = Object.values(MessageRoles);

const commandArea: MessageArea[] = [
    MessageArea.GroupMessage,
];

const commandMessageType: MessageType[] = [
    MessageType.TextMessage,
];

const commandHandler: SorenCommandMeta["commandHandler"] = (socket) => async (args) => {
    console.log("You call `ping` command!");
};

export {
    commandKey,
    commandRoles,
    commandArea,
    commandMessageType,
    commandHandler,
};
