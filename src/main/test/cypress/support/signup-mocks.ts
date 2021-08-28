import faker from 'faker';

import * as HttpMocks from './http-mocks';

export const mockEmailInUseError = (): void => HttpMocks.mockEmailInUseError(/signup/);

export const mockUnexpectedError = (): void => HttpMocks.mockUnexpectedError(/signup/, 'POST');
export const mockInvalidData = (): void =>
  HttpMocks.mockOk(/signup/, 'POST', { invalidProperty: faker.datatype.uuid() });
