import { config } from "@/config/config";
import { SorenEventMeta } from "@/types/types";
import { readdir } from "node:fs/promises";
import path from "node:path";

const getEventHandlers = async (): Promise<SorenEventMeta[]> => {
    const eventFilenames = await readdir(path.resolve(config.SOREN_EVENT_DIRECTORY));
    return await Promise.all(
        eventFilenames
            .filter(
                (filename) => filename !== "index.ts",
            )
            .map(
                async (filename) => await import(path.join(config.SOREN_EVENT_DIRECTORY, filename)),
            ),
    );
};

export { getEventHandlers };
