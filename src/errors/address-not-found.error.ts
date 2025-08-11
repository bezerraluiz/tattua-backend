import { BaseError } from "./base.error";

export class AddressNotFoundError extends BaseError {
  readonly statusCode = 404;
  readonly isOperacional = true;

  constructor(message: string = "No addresses found", context?: any) {
        super(message, context);
  }
}