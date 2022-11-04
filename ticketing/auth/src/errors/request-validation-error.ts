import { ValidationError } from "express-validator";

interface CustomError {
  statusCode: number;
  serializeErrors(): {
    message: string;
    field?: string;
  }[];
}

export class RequestValidationError extends Error implements CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();

    // Only because we extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param };
    });
  }
}
