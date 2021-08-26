import { RenderResult } from '@testing-library/react';

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
