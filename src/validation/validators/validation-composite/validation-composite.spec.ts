import faker from 'faker';

import { FieldValidationSpy } from '@/validation/test/mock-field-validation';

import { ValidationComposite } from './validation-compose';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpies: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpies = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)];
  const sut = ValidationComposite.build(fieldValidationSpies);
  return {
    sut,
    fieldValidationSpies,
  };
};

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationSpies } = makeSut(fieldName);
    const errorMessage = faker.random.words();
    fieldValidationSpies[0].error = new Error(errorMessage);
    fieldValidationSpies[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBe(errorMessage);
  });

  it('should return falsy if validation succeeds', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
