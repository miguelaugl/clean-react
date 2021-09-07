import faker from 'faker';

import { HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test';
import { mockRemoteSurveyListModel } from '@/data/test/mock-remote-survey-list';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

import { RemoteLoadSurveyList } from './remote-load-survey-list';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  it('should HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  it('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should return a list of LoadSurveyList.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.SUCCESS,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual(
      httpResult.map((result) => ({
        id: result.id,
        question: result.question,
        didAnswer: result.didAnswer,
        date: new Date(result.date),
      })),
    );
  });

  it('should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
