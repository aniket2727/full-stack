import React, { useState } from 'react';
import FirstStageRegisterpage from './FirstStageRegisterpage';
import SecondStageRegisterpage from './SecondStageRegisterpage';
import ThirdStageRegisterpage from './ThirdStageRegisterpage';

const Registerpage = () => {
  const [counter, setCounter] = useState(0);

  const handleCounterValue = (item: number) => {
    // Ensure counter stays between 0 and 2 for 3 stages
    setCounter(prev => Math.max(0, Math.min(prev + item, 2)));
  };

  return (
    <div>
      {counter === 0 && <FirstStageRegisterpage handleCounter={handleCounterValue} />}
      {counter === 1 && <SecondStageRegisterpage handleCounter={handleCounterValue} />}
      {counter === 2 && <ThirdStageRegisterpage handleCounter={handleCounterValue} />}
    </div>
  );
};

export default Registerpage;
