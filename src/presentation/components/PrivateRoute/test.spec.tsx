import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { PrivateRoute } from '.';

describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>,
    );
    expect(history.location.pathname).toBe('/login');
  });
});
