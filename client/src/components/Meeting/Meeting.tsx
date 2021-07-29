import React, { useState, useEffect, useCallback } from 'react';
import './Meeting.scss';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { BagAdd } from 'react-ionicons';
import { Link } from 'react-router-dom';
import { AuthLayout as Layout } from '../Reusable';
import { Route } from '../../utils';
import { MeetingItem } from './MeetingItem';
import * as MeetingTypes from './generated';

const Meeting = () => {
  const [items, setItems] = useState<MeetingTypes.GetMeetingsType[]>([]);

  const { data, loading, error } = useQuery<MeetingTypes.MeetingResponse>(
    MeetingTypes.GET_MEETINGS,
    {
      fetchPolicy: 'network-only',
    }
  );

  const [deleteMeeting, { data: deleteResponse }] = useMutation<
    MeetingTypes.DeleteMeetingResponse,
    MeetingTypes.DeleteMeetingVariable
  >(MeetingTypes.DELETE_MEETING);

  const { data: newMeetingResponse } =
    useSubscription<MeetingTypes.GetCreatedMeetingResponse>(
      MeetingTypes.CREATED_MEETING_SUBSCRIPTION
    );

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

  useEffect(() => {
    if (newMeetingResponse && newMeetingResponse.getCreatedMeeting) {
      setItems([newMeetingResponse.getCreatedMeeting, ...items]);
    }
    // eslint-disable-next-line
  }, [newMeetingResponse]);

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
                  {items.map((item, index) => (
                    <MeetingItem
                      item={item}
                      key={index}
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
