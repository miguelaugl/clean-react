import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignup } from '@/main/factories/pages/signup/signup-factory';
import { SurveyList } from '@/presentation/pages';

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' exact component={makeLogin} />
      <Route path='/signup' exact component={makeSignup} />
      <Route path='/' exact component={SurveyList} />
    </Switch>
  </BrowserRouter>
);
