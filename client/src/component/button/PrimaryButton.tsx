import React from 'react';

interface BaseButtonProps {
  text: string;
  color?: string;
  fontSize?: string;
  onClick: () => void;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  disabled?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  color = 'green',
  fontSize = '16px',
  onClick,
  borderRadius = '4px',
  padding = '10px 20px',
  margin = '10px 0',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        fontSize: fontSize,
        borderRadius: borderRadius,
        padding: padding,
        margin: margin,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default BaseButton;
