import faker from 'faker';

import * as HttpMocks from './http-mocks';

export const mockInvalidCredentialsError = (): void => HttpMocks.mockInvalidCredentialsError(/login/);

export const mockUnexpectedError = (): void => HttpMocks.mockUnexpectedError(/login/, 'POST');

export const mockOk = (): void =>
  HttpMocks.mockOk(/login/, 'POST', {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });

export const mockInvalidData = (): void => HttpMocks.mockOk(/login/, 'POST', { invalidProperty: faker.datatype.uuid() });
