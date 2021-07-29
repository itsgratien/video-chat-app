import React from 'react';
import './MeetingDetailItem.scss';
import { CopyOutline } from 'react-ionicons';

interface Props {
  item: {
    label: string;
    value: string;
    id: string;
  };
}

const MeetingDetailItem = (props: Props) => {
  const { item } = props;

  return (
    <div className='relative meetingDetailItem flex items-center w-full justify-between'>
      <div className='flex flex-col item flex-grow'>
        <span className='font-bold text-secondaryColor'>{item.label}</span>
        <span>{item.value}</span>
      </div>
      <div className='copy relative'>
        <button
          type='button'
          className='outline-none focus:outline-none bg-secondaryColor flex items-center justify-center'
        >
          <CopyOutline color='white' />
        </button>
      </div>
    </div>
  );
};
export default MeetingDetailItem;
