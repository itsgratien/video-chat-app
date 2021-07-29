import React, { useState, useEffect, useCallback } from 'react';
import './Meeting.scss';
import { useQuery, gql, useMutation, useSubscription } from '@apollo/client';
import { BagAdd } from 'react-ionicons';
import { Link } from 'react-router-dom';
import { AuthLayout as Layout } from '../Reusable';
import { Route } from '../../utils';
import { MeetingItem } from './MeetingItem';

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

const GET_MEETINGS = gql`
  query GetMeetings {
    getMeetings {
      ...MeetingItem
    }
  }
  ${MEETING}
`;

const DELETE_MEETING = gql`
  mutation DeleteMeeting($id: ID!) {
    deleteMeeting(id: $id) {
      message
      meetingId
    }
  }
`;

const CREATED_MEETING_SUBSCRIPTION = gql`
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

interface DeleteMeetingResponse {
  deleteMeeting: {
    message: string;
    meetingId: string;
  } | null;
}

interface DeleteMeetingVariable {
  id: string;
}

interface GetCreatedMeetingResponse {
  getCreatedMeeting: GetMeetingsType | null;
}

const Meeting = () => {
  const [items, setItems] = useState<GetMeetingsType[]>([]);

  const { data, loading, error } = useQuery<MeetingResponse>(GET_MEETINGS, {
    fetchPolicy: 'network-only',
  });

  const [deleteMeeting, { data: deleteResponse }] = useMutation<
    DeleteMeetingResponse,
    DeleteMeetingVariable
  >(DELETE_MEETING);

  const { data: newMeetingResponse } =
    useSubscription<GetCreatedMeetingResponse>(CREATED_MEETING_SUBSCRIPTION);

  const handleDeleteMeeting = useCallback(
    (value: string) => {
      deleteMeeting({ variables: { id: value } });

      return undefined;
    },
    [deleteMeeting]
  );

  useEffect(() => {
    if (data && data.getMeetings) {
      setItems(data.getMeetings);
    }
  }, [data]);

  useEffect(() => {
    if (deleteResponse && deleteResponse.deleteMeeting) {
      const filter = items.filter(
        (item) => item._id !== deleteResponse.deleteMeeting?.meetingId
      );

      setItems(filter);
    }
    // eslint-disable-next-line
  }, [deleteResponse]);

  return (
    <Layout>
      <div className='relative container mx-auto meeting'>
        <div className='meetingItemContainer flex flex-col justify-center'>
          <div className='addMeeting'>
            <Link to={Route.NewMeeting}>
              <button
                type='button'
                className='text-center font-bold flex items-center justify-center border-0 border-b border-secondaryColor pl-3 pr-3 pb-2'
              >
                <BagAdd /> <span className='ml-2'>meeting</span>
              </button>
            </Link>
          </div>
          {error && (
            <span className='text-secondaryColor font-bold'>
              An error occurred
            </span>
          )}

          {!loading && items && (
            <>
              {items.length > 0 ? (
                <>
                  {items.map((item) => (
                    <MeetingItem
                      item={item}
                      key={item._id}
                      handleDelete={handleDeleteMeeting}
                    />
                  ))}
                </>
              ) : (
                <span className='text-secondaryColor font-bold'>
                  No result found
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Meeting;
