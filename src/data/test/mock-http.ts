import faker from 'faker';

import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.SUCCESS,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.headers = data.headers;
    this.body = data.body;
    return Promise.resolve(this.response);
  }
}
