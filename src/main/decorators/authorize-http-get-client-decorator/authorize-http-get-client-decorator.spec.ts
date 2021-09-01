import faker from 'faker';

import { HttpGetParams } from '@/data/protocols/http';
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test';
import { AuthorizeHttpGetClientDecotator } from '@/main/decorators';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecotator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecotator(getStorageSpy, httpGetClientSpy);
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  };
};

describe('AuthorizeHttpGetClientDecotator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  it('should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.database.column(),
      },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });
});
