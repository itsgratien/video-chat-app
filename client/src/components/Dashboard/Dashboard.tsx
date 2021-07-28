import React from 'react';
import './Dashboard.scss';
import { PaperPlane } from 'react-ionicons';
import { useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { AuthLayout as Layout, Button, ButtonBackground } from '../Reusable';
import { Route } from '../../utils';
import { User } from '../../cache';

const GET_PROFILE = gql`
  query GetProfile {
    me @client {
      _id
      email
    }
  }
`;

interface CurrentUser {
  me: User | null;
}

const Dashboard = () => {
  const { data } = useQuery<CurrentUser>(GET_PROFILE);

  const history = useHistory();

  const handleViewMeeting = () => history.push(Route.Meeting);

  return (
    <Layout>
      <div className='container mx-auto dashboard relative'>
        <div className='flex flex-col justify-center items-center m-auto h-full'>
          {data && data.me && (
            <div className='mb-5'>
              welcome <b>{data.me.email}</b>
            </div>
          )}
          <div className='viewMeeting'>
            <button
              type='button'
              className='text-center font-bold'
              onClick={handleViewMeeting}
            >
              My meetings
            </button>
          </div>
          <div className='scheduleMeeting'>
            <Button
              name='Schedule meeting'
              type='button'
              backgroundColor={ButtonBackground.White}
              showBlackBorder
              icon={<PaperPlane />}
              borderRadius='5px'
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
