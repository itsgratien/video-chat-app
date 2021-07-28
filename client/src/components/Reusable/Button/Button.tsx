import React from 'react';
import './Button.scss';

export enum ButtonBackground {
  Black = '#03071E',
  White = '#F6F6F6',
}

interface Props {
  type: 'submit' | 'button';
  name?: string;
  backgroundColor: ButtonBackground.Black | ButtonBackground.White;
  icon?: any;
  showBlackBorder?: boolean;
  bold?: boolean;
  disabled?: boolean;
}

const Button = (props: Props) => {
  const { type, name, backgroundColor, icon, showBlackBorder, bold, disabled } =
    props;

  return (
    <button
      type={type}
      className={`outline-none focus:outline-none flex items-center justify-center w-full customButton ${
        bold ? 'font-bold' : ''
      }`}
      style={{
        borderRadius: '10px',
        backgroundColor,
        height: '67px',
        border: showBlackBorder ? `1px solid ${ButtonBackground.Black}` : '',
        color:
          backgroundColor === ButtonBackground.Black
            ? 'white'
            : ButtonBackground.Black,
      }}
      disabled={disabled}
    >
      {icon && (
        <>
          {icon}
          <span className='ml-2'>{name || 'submit'}</span>
        </>
      )}
      {!icon && <span>{name || 'submit'}</span>}
    </button>
  );
};
export default Button;
