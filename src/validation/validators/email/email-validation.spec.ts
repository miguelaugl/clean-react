import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';
import { EmailValidation } from './email-validation';

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column());

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  it('should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});