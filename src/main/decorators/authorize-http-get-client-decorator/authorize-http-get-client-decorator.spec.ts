import { GetStorageSpy, mockGetRequest } from '@/data/test';
import { AuthorizeHttpGetClientDecotator } from '@/main/decorators';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecotator;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecotator(getStorageSpy);
  return {
    getStorageSpy,
    sut,
  };
};

describe('AuthorizeHttpGetClientDecotator', () => {
  it('should call GetStorage with correct value', () => {
    const { sut, getStorageSpy } = makeSut();
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });
});
