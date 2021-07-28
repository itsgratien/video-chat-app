import React from 'react';
import './OnlineUsers.scss';

const OnlineUsers = () => {
  return (
    <div className='fixed onlineUsers w-full top-0'>
      <ul className='flex items-center justify-center'>
        <li className="relative">
          <div className='item flex items-center justify-center text-white'>g</div>
          <div className='online absolute bottom-0 right-0'></div>
        </li>
      </ul>
    </div>
  );
};

export default OnlineUsers;
