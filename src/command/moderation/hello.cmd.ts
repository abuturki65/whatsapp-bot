import {
    MessageArea,
    MessageRoles,
    MessageType,
} from "@/enums/enums";
import { SorenCommandMeta } from "@/types/types";

const commandKey: string | string[] = "hello";

const commandRoles: MessageRoles[] = [
    MessageRoles.GroupMember,
];

const commandArea: MessageArea[] = [
    MessageArea.GroupMessage,
    MessageArea.PersonalMessage,
];

const commandMessageType: MessageType[] = [
    MessageType.TextMessage,
];

const commandHandler: SorenCommandMeta["commandHandler"] = (socket) => async (args) => {
    console.log("You call `hello` command!");
};

export {
    commandKey,
    commandRoles,
    commandArea,
    commandMessageType,
    commandHandler,
};
