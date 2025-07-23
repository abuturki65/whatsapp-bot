import { logger } from "../logger/logger";
import { BaseErrorOptions } from "@/types/types";

class BaseError extends Error {
    public options: BaseErrorOptions;

    constructor(message: string, options: BaseErrorOptions = {
        details: false,
        logger: "error",
    }) {
        super(message);
        this.name = "BaseError";
        this.options = options;
    }

    log(): void {
        switch (this.options.logger) {
            case "debug":
                this.debug();
                break;
            case "info":
                this.info();
                break;
            case "warn":
                this.warn();
                break;
            default:
                this.error();
        }
    }

    debug(): void {
        logger.debug(this.message);
    }

    info(): void {
        logger.info(this.message);
    }

    warn(): void {
        logger.warn(this.message);
    }

    error(): void {
        logger.error(this.message);
    }
}

export { BaseError };
