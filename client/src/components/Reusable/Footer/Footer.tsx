import React from 'react';
import './Footer.scss';
import { Call } from 'react-ionicons';
import { Button, ButtonBackground } from '../../Reusable';

interface Props {
  handleClick?: () => void;
  showCallButton?: boolean;
}

const Footer = (props: Props) => {
  const { handleClick, showCallButton } = props;

  return (
    <div className='footer fixed w-full relative bottom-0 bg-primaryColor'>
      <div className='logoutSection flex items-center justify-center w-full'>
        {showCallButton ? (
          <button
            type='button'
            className='endCall bg-secondaryColor flex items-center justify-center'
            onClick={handleClick}
          >
            <Call color='white' width='30px' height='30px' />
          </button>
        ) : (
          <div style={{ width: '219px' }}>
            <Button
              name='Logout'
              backgroundColor={ButtonBackground.Black}
              type='button'
              onClick={handleClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
