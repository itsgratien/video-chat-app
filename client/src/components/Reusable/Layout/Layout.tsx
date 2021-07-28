import React, { FC, createContext } from 'react';
import { useQuery, gql } from '@apollo/client';

export const IsAuth = createContext<{ isLoggedIn?: boolean }>({});

const IS_LOGGED_ID = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const Layout: FC = (props) => {
  const { children } = props;

  const { data } = useQuery(IS_LOGGED_ID);

  return (
    <IsAuth.Provider value={{ isLoggedIn: data.isLoggedIn || false }}>
      {children}
    </IsAuth.Provider>
  );
};
export default Layout;
