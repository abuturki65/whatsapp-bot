import "dotenv/config";
import path from "node:path";

const config = {
    /** General Configuration */
    SOREN_SESSION: process.env.SOREN_SESSION || ".sorensession",
    SOREN_CACHE_METHOD: process.env.SOREN_CACHE_METHOD || "in_memory",
    SOREN_COMMAND_PREFIX: process.env.SOREN_COMMAND_PREFIX ? process.env.SOREN_COMMAND_PREFIX.split(",") : ["/"],

    /** Constant Path Configuration */
    SOREN_COMMAND_DIRECTORY: path.resolve("src", "command"),
    SOREN_EVENT_DIRECTORY: path.resolve("src", "socket", "events"),
    SOREN_LOG_DIRECTORY: path.resolve(process.env.SOREN_LOG_DIRECTORY || "logs"),

    /** Bot Metadata Constant */
    SOREN_BOT_OWNER: process.env.SOREN_BOT_OWNER,
};

export { config };
