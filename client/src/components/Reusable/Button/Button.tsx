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
  onClick?: () => void;
  borderRadius?: '5px' | '10px';
  height?: string;
  fontSize?: string;
}

const Button = (props: Props) => {
  const {
    type,
    name,
    backgroundColor,
    icon,
    showBlackBorder,
    bold,
    disabled,
    borderRadius,
    onClick,
    height,
    fontSize,
  } = props;

  return (
    <button
      type={type}
      className={`outline-none focus:outline-none flex items-center justify-center w-full customButton ${
        bold ? 'font-bold' : ''
      }`}
      style={{
        borderRadius: borderRadius || '10px',
        backgroundColor,
        height: height || '67px',
        border: showBlackBorder ? `1px solid ${ButtonBackground.Black}` : '',
        color:
          backgroundColor === ButtonBackground.Black
            ? 'white'
            : ButtonBackground.Black,
        fontSize: fontSize || '15px',
      }}
      disabled={disabled}
      onClick={onClick}
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
