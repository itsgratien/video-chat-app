import React from 'react';
import './Dashboard.scss';
import { PaperPlane } from 'react-ionicons';
import { useHistory } from 'react-router-dom';
import { AuthLayout as Layout, Button, ButtonBackground } from '../Reusable';
import { Route } from '../../utils';

const Dashboard = () => {
  const history = useHistory();

  const handleViewMeeting = () => history.push(Route.Meeting);

  return (
    <Layout>
      <div className='container mx-auto dashboard relative'>
        <div className='flex flex-col justify-center items-center m-auto h-full'>
          <div className="mb-5">
            welcome <b>gracian2020@gmail.com</b>
          </div>
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
