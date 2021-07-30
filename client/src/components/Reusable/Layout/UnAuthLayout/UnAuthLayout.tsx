import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from '../../../../utils';
import Layout, { AuthContext } from '../Layout';

const UnAuthLayout: FC = (props) => {
  const { children } = props;

  return (
    <Layout>
      <AuthContext.Consumer>
        {(value) => {
          if (!value.isLoggedIn) {
            return <>{children}</>;
          }
          return <Redirect to={Route.Dashboard} />;
        }}
      </AuthContext.Consumer>
    </Layout>
  );
};
export default UnAuthLayout;
