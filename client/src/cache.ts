import { InMemoryCache, makeVar } from '@apollo/client';
import { AppEnum } from './utils';

export interface User {
  _id: string;
  email: string;
}
export const isLoggedInVar = makeVar<boolean>(
  !!localStorage.getItem(AppEnum.Token)
);

export const getCurrentUser = makeVar<User | undefined>(
  JSON.parse(String(localStorage.getItem(AppEnum.CurrentUser)))
);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read: () => isLoggedInVar(),
        },
        me: {
          read: () => getCurrentUser(),
        },
      },
    },
  },
});
