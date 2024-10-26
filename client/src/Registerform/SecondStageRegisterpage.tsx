import React from 'react';

type PropsData = {
  handleCounter: (item: number) => void;
};

const SecondStageRegisterpage: React.FC<PropsData> = ({ handleCounter }) => {
  return (
    <div>
      <h1>This is the second stage</h1>
      <button onClick={() => handleCounter(-1)}>Previous</button>
      <button onClick={() => handleCounter(1)}>Next</button>
    </div>
  );
};

export default SecondStageRegisterpage;
