import React, { useState } from 'react';
import './OnlineUsers.scss';
import { useSubscription, gql } from '@apollo/client';
import { UserDetail } from './UserDetail';
import { User } from '../../../cache';

const GET_ONLINE_USERS = gql`
  subscription GetOnlineUsers($id: String!) {
    getOnlineUsers(id: $id) {
      _id
      email
      lastSeen
    }
  }
`;

interface GetOnlineUsersResponse {
  getOnlineUsers: User[] | null;
}

interface Props {
  userId: string;
}

interface GetOnlineUserVariables {
  id: string;
}

const OnlineUsers = (props: Props) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const [user, setUser] = useState<User>();

  const { userId } = props;

  const { data } = useSubscription<
    GetOnlineUsersResponse,
    GetOnlineUserVariables
  >(GET_ONLINE_USERS, {
    variables: { id: userId },
  });

  const handleHovered = (value: User) => {
    setHovered(true);

    setUser(value);
  };

  if (!data) {
    return <></>;
  }

  console.log('data', data.getOnlineUsers);

  return (
    <div className='fixed onlineUsers w-full top-0 bg-primaryColor'>
      {data.getOnlineUsers && (
        <ul
          className='flex items-center justify-center'
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && user ? (
            <UserDetail
              email={user.email}
              id={user._id}
              setHovered={setHovered}
            />
          ) : (
            <>
              {data.getOnlineUsers.length > 0 && (
                <>
                  {data.getOnlineUsers.map((item, index) => (
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
  );
};

export default OnlineUsers;
