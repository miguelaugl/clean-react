import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const PrivateRoute = (props: RouteProps) => {
  return <Route {...props} component={() => <Redirect to='/login' />} />;
};
