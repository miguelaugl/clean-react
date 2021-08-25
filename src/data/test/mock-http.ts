import faker from 'faker';

import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.SUCCESS,
  };

  async post({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
