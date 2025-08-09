import { BaseError } from "./base.error";

export class UserNotFoundError extends BaseError {
    readonly statusCode = 404;
    readonly isOperacional = true;

    constructor(message: string = "No users found", context?: any) {
        super(message, context);
    }
}