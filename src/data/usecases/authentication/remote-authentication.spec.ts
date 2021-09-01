import faker from 'faker';

import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { mockAuthenticationModel, mockAuthenticationParams } from '@/domain/test';

import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<RemoteAuthentication.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthenticationParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should return an AddAccount.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAuthenticationModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.SUCCESS,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthenticationParams());
    expect(account).toEqual(httpResult);
  });
});
