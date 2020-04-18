import React, { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories';
import Tasks from './Tasks';

const App = () => {
  const [userQuery, setUserQuery] = useState('');

  const updateUserQuery = (event) => setUserQuery(event.target.value);

  const handleKeyPress = (event) => event.key === 'Enter' && searchQuery();

  const searchQuery = () =>
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');

  return (
    <div className='App'>
      <h1>Hello Efi</h1>
      <div className='form'>
        <input
          value={userQuery}
          onChange={updateUserQuery}
          onKeyPress={handleKeyPress}
        />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Stories />
      <hr />
      <Tasks />
    </div>
  );
};

export default App;
