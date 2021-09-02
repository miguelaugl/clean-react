import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

describe('Header Component', () => {
  it('should call setCurrentAccount with falsy value on logout', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const setCurrentAccountMock = jest.fn();
    render(
      <Router history={history}>
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
          <Header />
        </ApiContext.Provider>
      </Router>,
    );
    fireEvent.click(screen.getByTestId('logout'));
    expect(history.location.pathname).toBe('/login');
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
  });
});
