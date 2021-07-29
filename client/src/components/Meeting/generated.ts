import { gql } from '@apollo/client';

export const MEETING = gql`
  fragment MeetingItem on Meeting {
    _id
    name
    owner
    meetingLink
    passCode
    createdAt
    updatedAt
  }
`;

export const GET_MEETINGS = gql`
  query GetMeetings {
    getMeetings {
      ...MeetingItem
    }
  }
  ${MEETING}
`;

export const DELETE_MEETING = gql`
  mutation DeleteMeeting($id: ID!) {
    deleteMeeting(id: $id) {
      message
      meetingId
    }
  }
`;

export const CREATED_MEETING_SUBSCRIPTION = gql`
  subscription GetCreatedMeeting {
    getCreatedMeeting {
      _id
      name
    }
  }
`;
export interface GetMeetingsType {
  _id: string;
  name: string;
  owner: string;
  passCode: string;
  meetingLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingResponse {
  getMeetings: GetMeetingsType[] | null;
}

export interface DeleteMeetingResponse {
  deleteMeeting: {
    message: string;
    meetingId: string;
  } | null;
}

export interface DeleteMeetingVariable {
  id: string;
}

export interface GetCreatedMeetingResponse {
  getCreatedMeeting: GetMeetingsType | null;
}
