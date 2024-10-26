import React from 'react';

type PropsData = {
  handleCounter: (item: number) => void;
};

const FirstStageRegisterpage: React.FC<PropsData> = ({ handleCounter }) => {
  return (
    <div>
      <h1>This is the first stage</h1>
      <button onClick={() => handleCounter(1)}>Next</button>
    </div>
  );
};

export default FirstStageRegisterpage;
