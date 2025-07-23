import { BaseErrorOptions } from "@/types/types";
import { BaseError } from "./BaseError";

class GeneralError extends BaseError {
    constructor(message: string, options?: BaseErrorOptions) {
        super(message, options);
        this.name = "GeneralError";
    }
}

export { GeneralError };
