import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';

export const testChildCount = (elName: string, count: number): void => {
  const el = screen.getByTestId(elName);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (elName: string, isDisabled = true) => {
  const button = screen.getByTestId(elName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid');
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testElementExists = (elementName: string) => {
  const el = screen.getByTestId(elementName);
  expect(el).toBeTruthy();
};

export const testElementText = (elementName: string, text: string) => {
  const el = screen.getByTestId(elementName);
  expect(el.textContent).toBe(text);
};
