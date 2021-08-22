import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(): Error {
    return new InvalidFieldError();
  }
}
