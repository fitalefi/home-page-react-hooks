import React from 'react';
import { useFetch } from './hooks';

const Joke = () => {
  const joke = useFetch('https://official-joke-api.appspot.com/jokes/random');

  if (!joke) {
    return <div>Loading...</div>;
  }
  const { setup, punchline } = joke;

  return (
    <div>
      <h3>Joke of the session</h3>
      <p>{setup}</p>
      <p>
        <em>{punchline}</em>
      </p>
    </div>
  );
};

export default Joke;
