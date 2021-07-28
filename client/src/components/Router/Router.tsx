import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Route as Path } from '../../utils';
import { Login } from '../Login';
import { PageNotFound } from '../PageNotFound';

const Router = () => {
  const appRouter = [
    {
      component: <Login />,
      path: Path.Login,
    },
    {
      component: <Login />,
      path: Path.Home,
    },
  ];
  return (
    <BrowserRouter>
      <Switch>
        {appRouter.map((item, index) => (
          <Route path={item.path} exact key={index}>
            {item.component}
          </Route>
        ))}
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
