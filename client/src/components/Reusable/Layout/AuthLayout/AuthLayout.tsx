import React, { FC, useEffect } from 'react';
import './AuthLayout.scss';
import { Redirect, useHistory } from 'react-router-dom';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import Layout, { AuthContext } from '../Layout';
import {
  GET_CURRENT_USER,
  GetProfileResponse,
  UPDATE_LAST_SEEN,
  UpdateLastSeenResponse,
} from '../generated';
import { Route, AppEnum } from '../../../../utils';
import { Button, ButtonBackground, OnlineUsers } from '../..';
import { getCurrentUser, isLoggedInVar } from '../../../../cache';

const AuthLayout: FC = (props) => {
  const { children } = props;

  const history = useHistory();

  const client = useApolloClient();

  const { loading, data } = useQuery<GetProfileResponse>(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  const [updateLastSeen] =
    useMutation<UpdateLastSeenResponse>(UPDATE_LAST_SEEN);

  const handleLogout = () => {
    client.cache.evict({ fieldName: 'me' });

    client.cache.evict({ fieldName: 'isLoggedIn' });

    client.cache.gc();

    client.clearStore();

    localStorage.removeItem(AppEnum.Token);

    localStorage.removeItem(AppEnum.CurrentUser);

    isLoggedInVar(false);

    getCurrentUser(undefined);

    history.push(Route.Login);

    return undefined;
  };

  useEffect(() => {
    updateLastSeen();

    setInterval(() => updateLastSeen(), 5000);

    return () => {
      clearInterval();
    };
  }, [updateLastSeen]);

  return (
    <Layout>
      <AuthContext.Consumer>
        {(value) => {
          if (loading) {
            return <span>Loading ...</span>;
          }
          if (
            typeof value.isLoggedIn === 'boolean' &&
            value.isLoggedIn === false
          ) {
            return <Redirect to={Route.Login} />;
          }
          return (
            <div className='authLayout relative flex flex-col min-h-screen'>
              {data && data.getProfile && (
                <OnlineUsers userId={data.getProfile._id} />
              )}
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
      </AuthContext.Consumer>
    </Layout>
  );
};
export default AuthLayout;
