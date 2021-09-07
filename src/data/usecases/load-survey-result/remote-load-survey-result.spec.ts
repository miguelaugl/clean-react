import faker from 'faker';

import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyResult } from '@/data/usecases';

describe('RemoteLoadSurveyResult', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });
});