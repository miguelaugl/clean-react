import faker from 'faker';

import { InvalidFieldError } from '@/validation/errors';

import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare);

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.random.words();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.words(),
      [fieldToCompare]: faker.random.words(),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  it('should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const valueToCompare = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: valueToCompare,
      [fieldToCompare]: valueToCompare,
    });
    expect(error).toBeFalsy();
  });
});
