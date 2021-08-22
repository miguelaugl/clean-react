import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Props = {
  makeLogin: React.FC;
};

export const Router = ({ makeLogin }: Props) => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' exact component={makeLogin} />
    </Switch>
  </BrowserRouter>
);
