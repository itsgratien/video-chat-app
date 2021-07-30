import { gql } from '@apollo/client';
import { User } from '../../../cache';

export const FRAGMENT = gql`
  fragment UserItem on User {
    _id
    email
    lastSeen
  }
`;
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getProfile {
      ...UserItem
    }
  }
  ${FRAGMENT}
`;

export interface GetProfileResponse {
  getProfile: User | null;
}

export const UPDATE_LAST_SEEN = gql`
  mutation UpdateLastSeen {
    updateLastSeen {
      ...UserItem
    }
  }
  ${FRAGMENT}
`;

export interface UpdateLastSeenResponse {
  updateLastSeen: User | null;
}
