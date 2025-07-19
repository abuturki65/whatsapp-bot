import path from "node:path";

const config = {
    SOREN_SESSION: process.env.SOREN_SESSION || ".sorensession",

    SOREN_COMMAND_DIRECTORY: path.resolve("src", "command"),
    SOREN_EVENT_DIRECTORY: path.resolve("src", "socket", "events"),
    SOREN_LOG_DIRECTORY: path.resolve(process.env.SOREN_LOG_DIRECTORY || "logs"),
};

export { config };
