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
  validationError: string = '',
): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(fieldName);
  const label = sut.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid');
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word(),
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testElementExists = (sut: RenderResult, elementName: string) => {
  const el = sut.getByTestId(elementName);
  expect(el).toBeTruthy();
};

export const testElementText = (sut: RenderResult, elementName: string, text: string) => {
  const el = sut.getByTestId(elementName);
  expect(el.textContent).toBe(text);
};
