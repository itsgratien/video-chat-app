import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import Layout, { IsAuth } from '../Layout';
import { Route } from '../../../../utils';

const AuthLayout: FC = (props) => {
  const { children } = props;

  return (
    <Layout>
      <IsAuth.Consumer>
        {(value) => {
          if (!value.isLoggedIn) {
            return <Redirect to={Route.Login} />;
          }

          return <>{children}</>;
        }}
      </IsAuth.Consumer>
    </Layout>
  );
};
export default AuthLayout;
