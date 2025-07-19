import { config } from "@/config/config";
import { join } from "node:path";
import pino, { stdTimeFunctions } from "pino";

const transport: pino.TransportMultiOptions = {
    targets: [
        {
            target: "pino-pretty",
            options: {
                colorize: true,
            },
        },
        {
            target: "pino-roll",
            options: {
                size: 10,
                mkdir: true,
                frequency: "daily",
                dateFormat: "yyyy-MM-dd",
                file: join(config.SOREN_LOG_DIRECTORY, "app.log"),
            },
        },
    ],
};

const logger = pino(
    {
        name: config.SOREN_SESSION,
        timestamp: stdTimeFunctions.isoTime,
        transport,
    },
);

export { logger };
