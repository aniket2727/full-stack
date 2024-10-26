import React from 'react';

type PropsData = {
  handleCounter: (item: number) => void;
};

const ThirdStageRegisterpage: React.FC<PropsData> = ({ handleCounter }) => {
  return (
    <div>
      <h1>This is the third stage</h1>
      <button onClick={() => handleCounter(-1)}>Previous</button>
      <button onClick={() => handleCounter(1)}>Submit</button>
    </div>
  );
};

export default ThirdStageRegisterpage;
