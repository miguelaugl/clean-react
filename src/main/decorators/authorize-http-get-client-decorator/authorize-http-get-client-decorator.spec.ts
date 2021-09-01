import { GetStorageSpy, mockGetRequest } from '@/data/test';
import { AuthorizeHttpGetClientDecotator } from '@/main/decorators';

describe('AuthorizeHttpGetClientDecotator', () => {
  it('should call GetStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecotator(getStorageSpy);
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });
});
