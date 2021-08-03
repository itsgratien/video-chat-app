import React, { useEffect, useState } from 'react';
import './MakeCall.scss';
import { useMutation, gql } from '@apollo/client';
import { CloseCircle } from 'react-ionicons';
import { Footer } from '../Footer';
import { User } from '../../../cache';
import { USER_FRAGMENT, CallType } from '../Layout/generated';

const MAKE_CALL = gql`
  mutation MakeCall($receiverId: ID!) {
    makeCall(receiverId: $receiverId) {
      user {
        ...UserItem
      }
    }
  }
  ${USER_FRAGMENT}
`;

interface MakeCallResponse {
  makeCall: {
    user: User | undefined;
  };
}

interface MakeCallVariable {
  receiverId: string;
}

interface Props {
  user: User;
  getRejectedCallResponse?: CallType;
  handleClose: () => void;
}

const MakeCall = (props: Props) => {
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const { user, getRejectedCallResponse, handleClose } = props;

  const [makeCall, makeCallResponse] = useMutation<
    MakeCallResponse,
    MakeCallVariable
  >(MAKE_CALL);

  useEffect(() => {
    if (user) {
      makeCall({ variables: { receiverId: user._id } });
    }
  }, [makeCall, user]);

  useEffect(() => {
    if (makeCallResponse.data && makeCallResponse.data.makeCall.user) {
      setIsCalling(true);
    }
  }, [makeCallResponse]);

  return (
    <div className='makeCall fixed inset-0 bg-primaryColor flex flex-col'>
      {getRejectedCallResponse ? (
        <div className='h-full w-full relative container mx-auto'>
          <div className='absolute right-0 top-0 mt-10'>
            <button
              type='button'
              className='outline-none focus:outline-none'
              onClick={handleClose}
            >
              <CloseCircle color='#03071E' width='50px' height='50px' />
            </button>
          </div>
          <div className='flex items-center justify-center h-full'>
            <div className='flex flex-col' style={{ marginBottom: '200px' }}>
              <span
                className='text-secondaryColor font-bold'
                style={{ fontSize: '30px', marginBottom: '10px' }}
              >
                Sorry
              </span>
              <span className='text-sm'>
                {user.email} has rejected your call
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isCalling ? (
            <div className='callingAlert h-full w-full flex items-center justify-center'>
              <span className='text-secondaryColor'>
                Calling <b>{user.email}</b>
              </span>
            </div>
          ) : (
            <div className='video h-full w-full'>
              <video muted autoPlay={true} />
            </div>
          )}
        </>
      )}
      <Footer showCallButton />
    </div>
  );
};
export default MakeCall;
