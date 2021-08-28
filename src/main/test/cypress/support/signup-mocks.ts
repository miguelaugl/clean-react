import * as HttpMocks from './http-mocks';

export const mockEmailInUseError = (): void => HttpMocks.mockEmailInUseError(/signup/);

export const mockUnexpectedError = (): void => HttpMocks.mockUnexpectedError(/signup/, 'POST');
