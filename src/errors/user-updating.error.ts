import { BaseError } from "./base.error";

export class UserUpdatingError extends BaseError {
  readonly statusCode = 404;
  readonly isOperacional = true;

  constructor(message: string = "Failed to updated user", context?: any) {
        super(message, context);
  }
}