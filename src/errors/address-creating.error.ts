import { BaseError } from "./base.error";

export class AddressCreatingError extends BaseError {
  readonly statusCode = 404;
  readonly isOperacional = true;

  constructor(message: string = "Failed to create address", context?: any) {
        super(message, context);
  }
}