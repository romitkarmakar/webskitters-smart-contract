import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const reset = () => {
    setCount(initialValue);
  };

  // We return an object for a nicer API for the component that uses this hook
  return {
    count,
    increment,
    decrement,
    reset,
  };
}

export default useCounter;
