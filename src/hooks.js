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
