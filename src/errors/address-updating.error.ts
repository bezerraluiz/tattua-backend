import { BaseError } from "./base.error";

export class AddressUpdatingError extends BaseError {
  readonly statusCode = 404;
  readonly isOperacional = true;

  constructor(message: string = "Failed to updated address", context?: any) {
        super(message, context);
  }
}