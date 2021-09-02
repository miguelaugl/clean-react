import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { AccountModel } from '@/domain/models';
import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <Router history={history}>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Header />
      </ApiContext.Provider>
    </Router>,
  );
  return {
    history,
    setCurrentAccountMock,
  };
};

describe('Header Component', () => {
  it('should call setCurrentAccount with falsy value on logout', () => {
    const { history, setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId('logout'));
    expect(history.location.pathname).toBe('/login');
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
  });
});
