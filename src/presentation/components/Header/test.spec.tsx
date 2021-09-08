import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <Router history={history}>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
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

  it('should render username to render correctly', () => {
    const account = mockAccountModel();
    makeSut(account);
    expect(screen.getByTestId('username')).toHaveTextContent(account.name);
  });

  it('should not render username if account is null', () => {
    makeSut(null);
    expect(screen.queryByTestId('username')).not.toBeInTheDocument();
  });
});
