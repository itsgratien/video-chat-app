import React from 'react';
import './Dashboard.scss';
import { PaperPlane } from 'react-ionicons';
import { AuthLayout as Layout, Button, ButtonBackground } from '../Reusable';

const Dashboard = () => {
  return (
    <Layout>
      <div className='container mx-auto dashboard relative'>
        <div className='flex flex-col justify-center items-center m-auto h-full'>
          <div className='viewMeeting'>
            <button type='button' className='text-center font-bold'>
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
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
