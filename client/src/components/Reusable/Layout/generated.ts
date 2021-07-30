import { gql } from '@apollo/client';
import { User } from '../../../cache';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getProfile {
      _id
      email
    }
  }
`;

export interface GetProfileResponse {
  getProfile: User | null;
}
