import React, { useEffect, useState } from 'react';
import './MakeCall.scss';
import { useMutation, gql } from '@apollo/client';
import { Footer } from '../Footer';
import { User } from '../../../cache';
import { USER_FRAGMENT } from '../Layout/generated';

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

interface Props {
  user: User;
}

interface MakeCallResponse {
  makeCall: {
    user: User | undefined;
  };
}

interface MakeCallVariable {
  receiverId: string;
}

const MakeCall = (props: Props) => {
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const { user } = props;

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
      {isCalling ? (
        <div className='callingAlert h-full w-full flex items-center justify-center'>
          <span className="text-secondaryColor">
            calling <b>{user.email}</b>
          </span>
        </div>
      ) : (
        <div className='video h-full w-full'>
          <video muted autoPlay={true} />
        </div>
      )}
      <Footer showCallButton />
    </div>
  );
};
export default MakeCall;
