import React from 'react';
import './MeetingItem.scss';
import { Play, Trash } from 'react-ionicons';
import { GetMeetingsType } from '../Meeting';

interface Props {
  item: GetMeetingsType;
  handleDelete: (id: string) => void;
}

const MeetingItem = (props: Props) => {
  const { item, handleDelete } = props;

  return (
    <div className='meetingItem relative flex items-center justify-between border border-secondaryColor w-full'>
      <div className='font-bold  text-secondaryColor'>{item.name}</div>
      <div className='flex items-center'>
        <button
          type='button'
          className='outline-none focus:outline-none bg-secondaryColor flex items-center justify-center rounded-full'
        >
          <Play color='white' />
        </button>
        <button
          type='button'
          className='outline-none focus:outline-none bg-secondaryColor flex items-center justify-center'
          onClick={() => handleDelete(item._id)}
        >
          <Trash color='white' />
        </button>
      </div>
    </div>
  );
};
export default MeetingItem;
