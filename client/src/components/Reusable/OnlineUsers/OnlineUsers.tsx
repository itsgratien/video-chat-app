import React, { useState } from 'react';
import './OnlineUsers.scss';
import { UserDetail } from './UserDetail';

const OnlineUsers = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div className='fixed onlineUsers w-full top-0 bg-primaryColor'>
      <ul
        className='flex items-center justify-center'
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? (
          <UserDetail email='johndoe@gmail.com' id='' setHovered={setHovered} />
        ) : (
          <>
            <li className='relative' onMouseOver={() => setHovered(true)}>
              <div className='item flex items-center justify-center text-white bg-secondaryColor'>
                g
              </div>
              <div className='online absolute bottom-0 right-0'></div>
            </li>
            <li className='relative'>
              <div className='item flex items-center justify-center text-white bg-secondaryColor'>
                g
              </div>
              <div className='online absolute bottom-0 right-0'></div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default OnlineUsers;
