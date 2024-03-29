import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { mockAccountModel } from '@/domain/test';
import { ApiContext } from '@/presentation/contexts';

import { PrivateRoute } from '.';

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>,
  );
  return { history };
};

describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe('/login');
  });

  it('should render current component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/');
  });
});
