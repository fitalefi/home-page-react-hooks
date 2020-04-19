import React, { useState } from 'react';
import { useDynamicTransition } from './hooks';

import MATRIX_FRAMES from './data/matrix';

const minimumDelay = 10;
const minimumIncrement = 1;

const Matrix = () => {
  const [delay, setDelay] = useState(500);
  const [increment, setIncrement] = useState(5);

  const index = useDynamicTransition({
    increment,
    delay,
    length: MATRIX_FRAMES.length,
  });

  const updateDelay = (event) => {
    const delay = Number(event.target.value);
    setDelay(delay > minimumDelay ? delay : minimumDelay);
  };

  const updateIncrement = (event) => {
    const increment = Number(event.target.value);
    setIncrement(increment > minimumIncrement ? increment : minimumIncrement);
  };

  return (
    <div className='Matrix'>
      <img src={MATRIX_FRAMES[index]} alt='matrix' />
      <div className='multiform'>
        <div>
          Frame transition delay (seconds):
          <input type='number' onChange={updateDelay} />
        </div>
        <div>
          Frame increment:
          <input type='number' onChange={updateIncrement} />
        </div>
      </div>
    </div>
  );
};

export default Matrix;
