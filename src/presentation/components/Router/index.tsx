import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { SignUp } from '@/presentation/pages';

type Props = {
  makeLogin: React.FC;
};

export const Router = ({ makeLogin }: Props) => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' exact component={makeLogin} />
      <Route path='/signup' exact component={SignUp} />
    </Switch>
  </BrowserRouter>
);
