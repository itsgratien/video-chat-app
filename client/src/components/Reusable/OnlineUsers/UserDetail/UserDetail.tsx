import React from 'react';
import './UserDetail.scss';
import { Call } from 'react-ionicons';

interface Props {
  email: string;
  id: string;
  setHovered: (value: boolean) => void;
}

const UserDetail = (props: Props) => {
  const { email, setHovered } = props;

  return (
    <div
      className='userDetail flex items-center w-full justify-between'
      onMouseLeave={() => setHovered(true)}
    >
      <div className='detail flex items-center'>
        <div className='handle flex items-center justify-center font-bold text-white bg-secondaryColor'>
          g
        </div>
        <div className='font-bold ml-2'>{email}</div>
      </div>
      <div className='callUser'>
        <button
          type='button'
          className='outline-none focus:outline-none flex items-center justify-center border border-secondaryColor'
        >
          <Call />
        </button>
      </div>
    </div>
  );
};
export default UserDetail;
