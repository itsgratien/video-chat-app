import React, { useState } from 'react';
import './OnlineUsers.scss';
import { UserDetail } from './UserDetail';
import { User } from '../../../cache';
import { MakeCall } from '..';

interface Props {
  users?: User[];
}

const OnlineUsers = (props: Props) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const [makeCall, setMakeCall] = useState<boolean>(false);

  const [user, setUser] = useState<User>();

  const [callUser, setCallUser] = useState<User>();

  const { users } = props;

  const handleHovered = (value: User) => {
    setHovered(true);

    setUser(value);
  };

  const handleMakeCall = (value: User) => {
    setMakeCall(true);

    setCallUser(value);

    return undefined;
  };

  if (!users) {
    return <></>;
  }

  return (
    <>
      {makeCall && callUser && <MakeCall user={callUser} />}
      <div className='fixed onlineUsers w-full top-0 bg-primaryColor'>
        {users && (
          <ul
            className='flex items-center justify-center'
            onMouseLeave={() => setHovered(false)}
          >
            {hovered && user ? (
              <UserDetail
                email={user.email}
                id={user._id}
                setHovered={setHovered}
                handleMakeCall={handleMakeCall}
              />
            ) : (
              <>
                {users.length > 0 && (
                  <>
                    {users.map((item, index) => (
                      <li
                        className='relative'
                        onMouseOver={() => handleHovered(item)}
                        key={index}
                      >
                        <div className='item flex items-center justify-center text-white bg-secondaryColor'>
                          {item.email.charAt(0)}
                        </div>
                        <div className='online absolute bottom-0 right-0'></div>
                      </li>
                    ))}
                  </>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default OnlineUsers;
