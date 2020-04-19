import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setResults(json));
  }, [url]);

  return results;
};

export const useDynamicTransition = ({ increment, delay, length }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((storedIndex) => (storedIndex + increment) % length);
    }, delay);
    return () => clearInterval(interval);
  }, [delay, increment, length]);

  return index;
};
