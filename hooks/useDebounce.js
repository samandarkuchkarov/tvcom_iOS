import { useEffect, useState } from "react";

const useDebounce = (initial, delayedTime) => {
  const [value, setValue] = useState(initial);
  const [timeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  const setTimeoutFunc = (newValue, delay = true) => {
    if (timeout) {
      clearTimeout(timeout);
      setDebounceTimeout(null);
    }
    if (!delay) {
      setValue(newValue);
      return;
    }

    const tim = setTimeout(() => {
      setValue(newValue);
      setDebounceTimeout(null);
    }, delayedTime);

    setDebounceTimeout(tim);
  };

  return [value, setTimeoutFunc];
};

export default useDebounce;
