import { BaseError } from "./base.error";

export class UserAlreadyExists extends BaseError {
    readonly statusCode = 400;
    readonly isOperacional = true;

    constructor(message: string = "Usuário já cadastrado", context?: any) {
        super(message, context);
    }
}