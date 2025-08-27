import { BaseError } from "./base.error";

export class UserDontExists extends BaseError {
    readonly statusCode = 400;
    readonly isOperacional = true;

    constructor(message: string = "User don't exists", context?: any) {
        super(message, context);
    }
}