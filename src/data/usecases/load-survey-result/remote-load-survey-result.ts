import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadSurveyResult } from '@/domain/usecases';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
    const remoteSurveyResult = httpResponse.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.SUCCESS:
        return { ...remoteSurveyResult, date: new Date(remoteSurveyResult.date) };
      case HttpStatusCode.FORBIDDEN:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    answers: Answer[];
    date: string;
  };

  type Answer = {
    image?: string;
    answer: string;
    count: number;
    percent: number;
    isCurrentAccountAnswer: boolean;
  };
}
