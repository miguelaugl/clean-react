import React from 'react';
import { render } from '@testing-library/react';
import { FormContextProvider } from '@/presentation/contexts/form';
import { Input } from '.';

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const { getByTestId } = render(
      <FormContextProvider value={{ state: {} }}>
        <Input name='field' />
      </FormContextProvider>,
    );
    const input = getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
