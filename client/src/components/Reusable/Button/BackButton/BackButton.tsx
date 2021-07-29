import React from 'react';
import './BackButton.scss';
import { ChevronBack } from 'react-ionicons';

interface Props {
  handleGoBack: () => void;
}

export const BackButton = (props: Props) => {
  const { handleGoBack } = props;

  return (
    <button
      type='button'
      className='outline-none focus:outline-none backButton flex items-center justify-center'
      onClick={handleGoBack}
    >
      <ChevronBack />
    </button>
  );
};
export default BackButton;
