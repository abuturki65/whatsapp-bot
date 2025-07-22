type CustomLogger = {
    details?: boolean;
    logger?: "debug" | "info" | "warn" | "error";
};

class GeneralError extends Error {
    public options: CustomLogger;

    constructor(message: string, options?: CustomLogger) {
        super(message);
        this.name = "General Error";
        this.options = options || {
            details: false,
            logger: "error",
        };
    }
}

export { GeneralError };
