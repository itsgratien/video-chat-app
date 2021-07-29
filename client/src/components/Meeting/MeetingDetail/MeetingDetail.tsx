import React from 'react';
import './MeetingDetail.scss';
import { useParams, useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  AuthLayout as Layout,
  Button,
  ButtonBackground,
  BackButton,
} from '../../Reusable';
import { MeetingDetailItem } from './MeetingDetailItem';
import { MEETING, GetMeetingsType } from '../../Meeting';

const GET_MEETING_DETAIL = gql`
  query GetMeetingDetail($id: ID!) {
    getMeeting(id: $id) {
      ...MeetingItem
    }
  }
  ${MEETING}
`;

interface GetMeetingDetailResponse {
  getMeeting: GetMeetingsType | null;
}

interface GetMeetingDetailVariables {
  id: string;
}

const MeetingDetail = () => {
  const params = useParams<{ id: string }>();

  const history = useHistory();

  const handleGoBack = () => history.goBack();

  const { data, loading, error } = useQuery<
    GetMeetingDetailResponse,
    GetMeetingDetailVariables
  >(GET_MEETING_DETAIL, { variables: { id: params.id || '' } });

  return (
    <Layout>
      <div className='meetingDetail relative m-auto'>
        <BackButton handleGoBack={handleGoBack} />
        <div className='relative mt-3'>
          <svg
            viewBox='0 0 549 408'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M548.5 260.169C426.337 260.783 333.162 265.441 248.56 286.016C164.085 306.559 88.1817 342.965 0.5 407.015V5C0.5 2.51472 2.51472 0.5 5 0.5H544C546.485 0.5 548.5 2.51472 548.5 5V260.169Z'
              fill='#F6F6F6'
              stroke='#03071E'
            />
          </svg>
          <div className='detail'>
            {error && (
              <div
                className='w-full flex items-center justify-center'
                style={{ height: '200px' }}
              >
                <span className='font-bold'>{error.message}</span>
              </div>
            )}
            {data && data.getMeeting && !loading && (
              <>
                <div className='name flex flex-col'>
                  <span className='font-bold text-secondaryColor'>
                    {data.getMeeting.name}
                  </span>
                  <small style={{ marginTop: '7px' }}>
                    Last updated on{' '}
                    {new Date(data.getMeeting.updatedAt).toDateString()}
                  </small>
                </div>
                <div style={{ marginTop: '31px' }} className='w-full'>
                  <MeetingDetailItem
                    item={{
                      label: 'Link',
                      value: data.getMeeting.meetingLink,
                      id: 'id',
                    }}
                  />
                  <MeetingDetailItem
                    item={{
                      label: 'Pass code',
                      value: data.getMeeting.passCode,
                      id: 'id',
                    }}
                  />
                </div>
                <div style={{ marginTop: '34px', width: '238px' }}>
                  <Button
                    name='Start meeting'
                    showBlackBorder
                    backgroundColor={ButtonBackground.White}
                    type='button'
                    bold
                    borderRadius='5px'
                    height='58px'
                    fontSize='13px'
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default MeetingDetail;
