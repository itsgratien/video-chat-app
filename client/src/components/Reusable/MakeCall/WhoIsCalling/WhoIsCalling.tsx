import React from 'react';
import './WhoIsCalling.scss';
import { User } from '../../../../cache';

interface Props {
  user: User;
  handleRejectCall: (callId: string) => void;
  handleAcceptCall: (callId: string) => void;
  callId: string;
}

const WhoIsCalling = (props: Props) => {
  const { user, handleAcceptCall, handleRejectCall, callId } = props;

  return (
    <div className='whoIsCalling fixed flex flex-col top-0 left-0 right-0 pt-5'>
      <div className='callAlert bg-primaryColor'>
        <div className='text-secondaryColor'>{user.email} is calling you</div>
        <div className='flex items-center'>
          <button
            type='button'
            className='outline-none focus:outline-none bg-secondaryColor text-white'
            onClick={() => handleAcceptCall(callId)}
          >
            accept
          </button>
          <button
            type='button'
            className='outline-none focus:outline-none text-secondaryColor border border-secondaryColor'
            onClick={() => handleRejectCall(callId)}
          >
            reject
          </button>
        </div>
      </div>
    </div>
  );
};
export default WhoIsCalling;
