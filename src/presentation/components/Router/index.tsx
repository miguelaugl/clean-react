import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SurveyList from '@/presentation/pages/SurveyList';

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

export const Router = (factory: Factory) => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' exact component={factory.makeLogin} />
      <Route path='/signup' exact component={factory.makeSignUp} />
      <Route path='/' exact component={SurveyList} />
    </Switch>
  </BrowserRouter>
);
