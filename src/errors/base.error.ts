export abstract class BaseError extends Error {
    abstract readonly statusCode: number;
    abstract readonly isOperacional: boolean; // Erro de validação (true) ou inesperado (false)

    constructor(message: string, public readonly context?: any) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
};