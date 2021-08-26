import { AccountModel } from '@/domain/models';
import { AddAccount, AddAccountParams } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  params: AddAccountParams;
  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;
    return null;
  }
}
