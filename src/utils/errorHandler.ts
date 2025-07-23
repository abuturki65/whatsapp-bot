import { BaseError } from "@/lib/errors/BaseError";

/** Custom error handler */
const errorHandler = (error: unknown) => {
    if (error instanceof BaseError) {
        error.log();
        if (error.options.details) {
            console.error(error);
        }
    } else {
        console.error(error);
    }
};

export { errorHandler };
