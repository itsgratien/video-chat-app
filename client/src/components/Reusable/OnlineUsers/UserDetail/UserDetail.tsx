import React from 'react';
import './UserDetail.scss';
import { Call } from 'react-ionicons';
import { User } from '../../../../cache';

interface Props {
  email: string;
  id: string;
  setHovered: (value: boolean) => void;
  handleMakeCall: (user: User) => void;
}

const UserDetail = (props: Props) => {
  const { email, setHovered, handleMakeCall, id } = props;

  return (
    <div
      className='userDetail flex items-center w-full justify-between'
      onMouseLeave={() => setHovered(true)}
    >
      <div className='detail flex items-center'>
        <div className='handle flex items-center justify-center font-bold text-white bg-secondaryColor'>
          {email.charAt(0)}
        </div>
        <div className='font-bold ml-2'>{email}</div>
      </div>
      <div className='callUser'>
        <button
          type='button'
          className='outline-none focus:outline-none flex items-center justify-center border border-secondaryColor'
          onClick={() => handleMakeCall({ email, _id: id })}
        >
          <Call />
        </button>
      </div>
    </div>
  );
};
export default UserDetail;
