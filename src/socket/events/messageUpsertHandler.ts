import { SorenSocketType } from "@/types/types";
import { BaileysEventMap } from "baileys";

const eventKey: keyof BaileysEventMap = "messages.upsert";
const eventHandler = (socket: SorenSocketType) => async (listener: BaileysEventMap[typeof eventKey]) => {
    console.log(listener);
};

export {
    eventKey,
    eventHandler,
};
