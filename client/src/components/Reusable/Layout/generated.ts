import { gql } from '@apollo/client';
import { User } from '../../../cache';

export const CALL_FRAGMENT = gql`
  fragment CallItem on Call {
    _id
    status
    senderId
    receiverId
    createdAt
    updatedAt
  }
`;
export const USER_FRAGMENT = gql`
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
  ${USER_FRAGMENT}
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
  ${USER_FRAGMENT}
`;

export interface UpdateLastSeenResponse {
  updateLastSeen: User | null;
}

export interface GetWhoIsCallingResponse {
  getWhoIsCalling:
    | {
        _id: string;
        status: string;
        receiverId: string;
        senderId: User;
      }
    | undefined;
}

export const GET_WHO_IS_CALLING = gql`
  subscription GetWhoIsCalling {
    getWhoIsCalling {
      _id
      status
      receiverId
      senderId {
        ...UserItem
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ONLINE_USERS = gql`
  subscription GetOnlineUsers {
    getOnlineUsers {
      _id
      email
      lastSeen
    }
  }
`;

export interface GetOnlineUsersResponse {
  getOnlineUsers: User[] | undefined;
}

export const REJECT_CALL = gql`
  mutation RejectCall($callId: ID!) {
    rejectCall(callId: $callId) {
      message
    }
  }
`;

export interface RejectCallResponse {
  rejectCall: { message: string };
}

export interface RejectCallVariable {
  callId: string;
}

export const GET_REJECTED_CALL = gql`
  subscription GetRejectedCall {
    getRejectedCall {
      ...CallItem
    }
  }
  ${CALL_FRAGMENT}
`;

export interface CallType {
  _id: string;
  status: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetRejectedCallResponse {
  getRejectedCall: CallType | undefined;
}
