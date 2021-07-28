import React, { FC } from 'react';
import './AuthLayout.scss';
import { Redirect } from 'react-router-dom';
import Layout, { IsAuth } from '../Layout';
import { Route } from '../../../../utils';
import { Button, ButtonBackground, OnlineUsers } from '../..';

const AuthLayout: FC = (props) => {
  const { children } = props;

  return (
    <Layout>
      <IsAuth.Consumer>
        {(value) => {
          if (!value.isLoggedIn) {
            return <Redirect to={Route.Login} />;
          }

          return (
            <div className='authLayout relative flex flex-col min-h-screen'>
              <OnlineUsers />
              <div className='children'>{children}</div>
              <div className='footer fixed w-full relative bottom-0'>
                <div className='logoutSection flex items-center justify-center w-full'>
                  <div style={{ width: '219px' }}>
                    <Button
                      name='Logout'
                      backgroundColor={ButtonBackground.Black}
                      type='button'
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </IsAuth.Consumer>
    </Layout>
  );
};
export default AuthLayout;
