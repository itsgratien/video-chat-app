import React, { useState, useEffect } from 'react';
import './Meeting.scss';
import { useQuery, gql, useMutation } from '@apollo/client';
import { BagAdd } from 'react-ionicons';
import { useHistory } from 'react-router-dom';
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
  } | null;
}

interface DeleteMeetingVariable {
  id: string;
}

const Meeting = () => {
  const [items, setItems] = useState<GetMeetingsType[]>();

  const [itemId, setItemId] = useState<string>();

  const { data, loading, error } = useQuery<MeetingResponse>(GET_MEETINGS, {
    fetchPolicy: 'network-only',
  });

  const [deleteMeeting, deleteResponse] = useMutation<
    DeleteMeetingResponse,
    DeleteMeetingVariable
  >(DELETE_MEETING);

  const history = useHistory();

  const handleViewMeeting = () => history.push(Route.NewMeeting);

  const handleDeleteMeeting = (value: string) => {
    deleteMeeting({ variables: { id: value } });

    setItemId(value);

    return undefined;
  };

  useEffect(() => {
    if (data && data.getMeetings) {
      setItems(data.getMeetings);
    }
  }, [data]);

  useEffect(() => {
    if (
      deleteResponse &&
      deleteResponse.data &&
      deleteResponse.data.deleteMeeting &&
      itemId &&
      items
    ) {
      const filteredData = items.filter((item) => item._id !== itemId);

      setItems(filteredData);
    }
  }, [deleteResponse, items, itemId]);

  return (
    <Layout>
      <div className='relative container mx-auto meeting'>
        <div className='meetingItemContainer flex flex-col justify-center'>
          <div className='addMeeting'>
            <button
              type='button'
              className='text-center font-bold flex items-center justify-center border-0 border-b border-secondaryColor pl-3 pr-3 pb-2'
              onClick={handleViewMeeting}
            >
              <BagAdd /> <span className='ml-2'>meeting</span>
            </button>
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
