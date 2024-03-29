import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';
import { makeSurveyList } from '@/main/factories/pages';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignup } from '@/main/factories/pages/signup/signup-factory';
import { PrivateRoute } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

import { makeSurveyResult } from '../factories/pages/survey-result/survey-result-factory';

export const Router = () => (
  <ApiContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter,
    }}
  >
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={makeLogin} />
        <Route path='/signup' exact component={makeSignup} />
        <PrivateRoute path='/' exact component={makeSurveyList} />
        <PrivateRoute path='/surveys/:id' component={makeSurveyResult} />
      </Switch>
    </BrowserRouter>
  </ApiContext.Provider>
);
