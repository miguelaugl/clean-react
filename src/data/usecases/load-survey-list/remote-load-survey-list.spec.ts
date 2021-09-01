import faker from 'faker';

import { HttpStatusCode } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { mockSurveyListModel } from '@/domain/test';

import { RemoteLoadSurveyList } from './remote-load-survey-list';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  it('should HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should return a list of LoadSurveyList.Model if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.SUCCESS,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual(httpResult);
  });

  it('should return an empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
