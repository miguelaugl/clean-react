import { mockAxios } from '@/infra/test';
import axios from 'axios';
import { mockPostRequest } from '@/data/test';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL, verb and body', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('should return correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    const promiseMockedResolveValue = mockedAxios.post.mock.results[0].value;
    expect(promise).toEqual(promiseMockedResolveValue);
  });
});
