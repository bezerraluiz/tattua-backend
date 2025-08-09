import { BaseError } from "./base.error";

export class UserAlreadyExists extends BaseError {
    readonly statusCode = 400;
    readonly isOperacional = true;

    constructor(message: string = "User already registered", context?: any) {
        super(message, context);
    }
}