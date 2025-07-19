import {
    MessageArea,
    MessageRoles,
    MessageType,
} from "@/enums/enums";
import { SorenCommandMeta } from "@/types/types";

const commandKey: string | string[] = ["ping", "p"];

const commandRoles: MessageRoles[] = [
    MessageRoles.General,
];

const commandArea: MessageArea[] = [
    MessageArea.PersonalMessage,
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
