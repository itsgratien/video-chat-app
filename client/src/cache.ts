import { InMemoryCache, makeVar } from '@apollo/client';
import { AppEnum } from './utils';

export const isLoggedInVar = makeVar<boolean>(
  !!localStorage.getItem(AppEnum.Token)
);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read: () => isLoggedInVar(),
        },
      },
    },
  },
});
