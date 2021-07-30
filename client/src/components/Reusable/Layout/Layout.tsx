import React, { FC, createContext } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from './generated';

export const AuthContext = createContext<{ isLoggedIn?: boolean }>({});

const Layout: FC = (props) => {
  const { children } = props;

  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <AuthContext.Provider value={{ isLoggedIn: data.isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export default Layout;
