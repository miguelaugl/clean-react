import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

export const Router = (factory: Factory) => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' exact component={factory.makeLogin} />
      <Route path='/signup' exact component={factory.makeSignUp} />
    </Switch>
  </BrowserRouter>
);
