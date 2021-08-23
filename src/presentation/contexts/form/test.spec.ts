import { renderHook, cleanup } from '@testing-library/react-hooks';
import { useForm } from '.';

describe('useForm Hook', () => {
  afterEach(cleanup);

  it('should return an error if no context is informed', () => {
    const { result } = renderHook(() => useForm());
    const error = result.current;
    expect(error).toEqual(new Error('FormContext not found.'));
  });
});
