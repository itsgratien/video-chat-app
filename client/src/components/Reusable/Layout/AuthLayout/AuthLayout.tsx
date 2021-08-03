import React, { FC, useEffect, useState } from 'react';
import './AuthLayout.scss';
import { Redirect, useHistory } from 'react-router-dom';
import {
  useQuery,
  useApolloClient,
  useMutation,
  useSubscription,
} from '@apollo/client';
import Layout, { AuthContext } from '../Layout';
import {
  GET_CURRENT_USER,
  GetProfileResponse,
  UPDATE_LAST_SEEN,
  UpdateLastSeenResponse,
  GetWhoIsCallingResponse,
  GET_WHO_IS_CALLING,
  GetOnlineUsersResponse,
  GET_ONLINE_USERS,
  RejectCallResponse,
  REJECT_CALL,
  RejectCallVariable,
  GET_REJECTED_CALL,
  GetRejectedCallResponse,
  CallType,
} from '../generated';
import { Route, AppEnum } from '../../../../utils';
import { OnlineUsers, Footer, WhoIsCalling, MakeCall } from '../..';
import { getCurrentUser, isLoggedInVar, User } from '../../../../cache';

const AuthLayout: FC = (props) => {
  const [showWhoIsCalling, setShowWhoIsCalling] = useState<boolean>(false);

  const [callUser, setCallUser] = useState<User>();

  const [makeCall, setMakeCall] = useState<boolean>(false);

  const [rejectedCallSubscription, setRejectedCallSubscription] =
    useState<CallType>();

  const { children } = props;

  const history = useHistory();

  const client = useApolloClient();

  const { loading } = useQuery<GetProfileResponse>(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  const [updateLastSeen] =
    useMutation<UpdateLastSeenResponse>(UPDATE_LAST_SEEN);

  const { data: getWhoIsCallingResponse } =
    useSubscription<GetWhoIsCallingResponse>(GET_WHO_IS_CALLING);

  const { data: onlineUsers } =
    useSubscription<GetOnlineUsersResponse>(GET_ONLINE_USERS);

  const [rejectCallFunc, { data: rejectCallResponse }] = useMutation<
    RejectCallResponse,
    RejectCallVariable
  >(REJECT_CALL);

  const { data: getRejectedCallResponse } =
    useSubscription<GetRejectedCallResponse>(GET_REJECTED_CALL);

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

  const handleRejectCall = (value: string) => {
    rejectCallFunc({ variables: { callId: value } });

    return undefined;
  };

  const handleAcceptCall = (value: string) => {};

  const handleMakeCall = (value: User) => {
    setMakeCall(true);

    setCallUser(value);

    return undefined;
  };

  const handleCloseMakeCall = () => {
    setMakeCall(false);

    setCallUser(undefined);

    setRejectedCallSubscription(undefined);

    return undefined;
  };

  useEffect(() => {
    updateLastSeen();

    setInterval(() => updateLastSeen(), 5000);

    return () => {
      clearInterval();
    };
  }, [updateLastSeen]);

  useEffect(() => {
    if (getWhoIsCallingResponse && getWhoIsCallingResponse.getWhoIsCalling) {
      setShowWhoIsCalling(true);
    }
  }, [getWhoIsCallingResponse]);

  useEffect(() => {
    if (rejectCallResponse && rejectCallResponse.rejectCall) {
      setShowWhoIsCalling(false);
    }

    if (getRejectedCallResponse && getRejectedCallResponse.getRejectedCall) {
      setRejectedCallSubscription(getRejectedCallResponse.getRejectedCall);
    }
  }, [rejectCallResponse, getRejectedCallResponse]);

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
              {showWhoIsCalling &&
                getWhoIsCallingResponse &&
                getWhoIsCallingResponse.getWhoIsCalling &&
                getWhoIsCallingResponse.getWhoIsCalling.senderId && (
                  <WhoIsCalling
                    user={getWhoIsCallingResponse.getWhoIsCalling.senderId}
                    callId={getWhoIsCallingResponse.getWhoIsCalling._id}
                    handleAcceptCall={handleAcceptCall}
                    handleRejectCall={handleRejectCall}
                  />
                )}
              {makeCall && callUser && (
                <MakeCall
                  user={callUser}
                  getRejectedCallResponse={rejectedCallSubscription}
                  handleClose={handleCloseMakeCall}
                />
              )}
              {onlineUsers && (
                <OnlineUsers
                  users={onlineUsers.getOnlineUsers}
                  handleMakeCall={handleMakeCall}
                />
              )}
              <div className='children'>{children}</div>
              <Footer handleClick={handleLogout} />
            </div>
          );
        }}
      </AuthContext.Consumer>
    </Layout>
  );
};
export default AuthLayout;
