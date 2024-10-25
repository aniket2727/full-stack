import React from 'react';

interface BaseButtonProps {
  text: string;
  color?: 'green' | 'blue' | 'red' | 'yellow'; // Background color
  textColor?: string; // Text color
  borderColor?: string; // Border color
  borderRadius?: string; // Border radius
  fontSize?: string; // Font size
  onClick: () => void;
  padding?: string; // Padding
  margin?: string; // Margin
  disabled?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  color = 'green', // Default background color
  textColor = 'white', // Default text color
  borderColor = 'transparent', // Default border color
  borderRadius = 'rounded', // Default border radius
  fontSize = 'text-base', // Default font size
  onClick,
  padding = 'py-2 px-4', // Default padding
  margin = 'my-2', // Default margin
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${fontSize} ${borderRadius} ${padding} ${margin} bg-${color}-500 border ${borderColor} hover:bg-${color}-600 text-${textColor} font-semibold transition duration-300`}
      style={{
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
