import faker from 'faker';

import { SetStorageSpy } from '@/data/test';

import { LocalSaveAccessToken } from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);
  return {
    sut,
    setStorageSpy,
  };
};

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct value', async () => {
    const accessToken = faker.datatype.uuid();
    const { sut, setStorageSpy } = makeSut();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
