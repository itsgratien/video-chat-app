import React, { useState } from 'react';
import './OnlineUsers.scss';

const OnlineUsers = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div className='fixed onlineUsers w-full top-0'>
      <ul className='flex items-center justify-center'>
        <li
          className='relative'
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className='item flex items-center justify-center text-white'>
            g
          </div>
          <div className='online absolute bottom-0 right-0'></div>
        </li>
        <li className='relative'>
          <div className='item flex items-center justify-center text-white'>
            g
          </div>
          <div className='online absolute bottom-0 right-0'></div>
        </li>
      </ul>
    </div>
  );
};

export default OnlineUsers;