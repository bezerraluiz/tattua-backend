import { BaseError } from "./base.error";

export class QuoteNotFoundError extends BaseError {
    readonly statusCode = 404;
    readonly isOperacional = true;

    constructor(message: string = "No quotes found", context?: any) {
        super(message, context);
    }
}