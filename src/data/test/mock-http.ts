import faker from 'faker';

import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.SUCCESS,
  };

  async post({ url, body }: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
