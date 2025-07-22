import { BaileysEventMap } from "baileys";
import { errorHandler } from "./errorHandler";

/** Event wrapper function catch the error */
const eventWrapper = <T extends (listener: BaileysEventMap[keyof BaileysEventMap]) => Promise<void> | void>(
    fn: T,
) =>
(listener: BaileysEventMap[keyof BaileysEventMap]) => {
    Promise.resolve(fn(listener)).catch(errorHandler);
};

export { eventWrapper };
