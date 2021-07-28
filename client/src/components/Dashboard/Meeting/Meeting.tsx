import React from 'react';
import './Meeting.scss';
import { useQuery, gql } from '@apollo/client';
import { BagAdd } from 'react-ionicons';
import { useHistory } from 'react-router-dom';
import { AuthLayout as Layout } from '../../Reusable';
import { Route } from '../../../utils';
import { MeetingItem } from './MeetingItem';

const MEETING = gql`
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

const Meeting = () => {
  const { data, loading, error } = useQuery<MeetingResponse>(GET_MEETINGS, {
    fetchPolicy: 'network-only',
  });

  const history = useHistory();

  const handleViewMeeting = () => history.push(Route.Meeting);

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

          {data && data.getMeetings && (
            <>
              {data.getMeetings.length > 0 ? (
                <>
                  {data.getMeetings.map((item) => (
                    <MeetingItem item={item} key={item._id} />
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
