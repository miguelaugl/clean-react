import { renderHook, cleanup } from '@testing-library/react-hooks';
import faker from 'faker';

import { FormContextProvider, useForm } from '.';

describe('useForm Hook', () => {
  afterEach(cleanup);

  it('should return an error if no context is informed', () => {
    const { result } = renderHook(() => useForm());
    const error = result.current;
    expect(error).toEqual(new Error('FormContext not found.'));
  });

  it('should return an error if no context is informed', () => {
    const ctxValue = { email: faker.internet.email(), password: faker.internet.password() };
    const { result } = renderHook(() => useForm(), {
      wrapper: FormContextProvider,
      initialProps: { value: ctxValue },
    });
    expect(result.current).toEqual(ctxValue);
  });
});
