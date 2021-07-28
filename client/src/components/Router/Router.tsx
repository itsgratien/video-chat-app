import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Route as Path } from '../../utils';
import { Login } from '../Login';
import { PageNotFound } from '../PageNotFound';
import { Dashboard } from '../Dashboard';
import { Meeting, NewMeeting } from '../Meeting';

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
    {
      component: <Dashboard />,
      path: Path.Dashboard,
    },
    {
      component: <Meeting />,
      path: Path.Meeting,
    },
    {
      component: <NewMeeting />,
      path: Path.NewMeeting,
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
