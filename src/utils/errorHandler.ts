import { GeneralError } from "@/lib/errors";
import { logger } from "@/lib/logger/logger";

/** Custom error handler */
const errorHandler = (error: unknown) => {
    if (error instanceof GeneralError) {
        switch (error.options.logger) {
            case "debug":
                logger.debug(error.message);
                break;
            case "info":
                logger.info(error.message);
                break;
            case "warn":
                logger.warn(error.message);
                break;
            default:
                logger.error(error.message);
        }

        if (error.options.details) {
            console.error(error);
        }
    } else if (error instanceof Error) {
        logger.error(error.message);
    } else {
        console.log(error);
    }
};

export { errorHandler };
