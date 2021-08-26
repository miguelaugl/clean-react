import { fireEvent, RenderResult } from '@testing-library/react';
import faker from 'faker';

export const testChildCount = (sut: RenderResult, elName: string, count: number): void => {
  const el = sut.getByTestId(elName);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (sut: RenderResult, elName: string, isDisabled = true) => {
  const button = sut.getByTestId(elName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word(),
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};
