import React, { FC } from 'react';
import './AuthLayout.scss';
import { Redirect } from 'react-router-dom';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import Layout, { IsAuth } from '../Layout';
import { Route, AppEnum } from '../../../../utils';
import { Button, ButtonBackground, OnlineUsers } from '../..';
import { getCurrentUser, User, isLoggedInVar } from '../../../../cache';

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getProfile {
      _id
      email
    }
  }
`;

interface GetProfileResponse {
  getProfile: User | null;
}
const AuthLayout: FC = (props) => {
  const { children } = props;

  const client = useApolloClient();

  const { loading } = useQuery<GetProfileResponse>(GET_CURRENT_USER, {
    onCompleted: (res) => {
      if (res.getProfile) {
        localStorage.setItem(
          AppEnum.CurrentUser,
          JSON.stringify(res.getProfile)
        );

        getCurrentUser(res.getProfile);
      }
    },
  });

  const handleLogout = () => {
    client.cache.evict({ fieldName: 'me' });

    client.cache.evict({fieldName: 'isLoggedIn'});

    client.cache.gc();

    localStorage.removeItem(AppEnum.Token);

    localStorage.removeItem(AppEnum.CurrentUser);

    isLoggedInVar(false);

    getCurrentUser(undefined);

    return undefined;
  };

  return (
    <Layout>
      <IsAuth.Consumer>
        {(value) => {
          if (loading) {
            return <span>Loading ...</span>;
          }
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
                      onClick={handleLogout}
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
