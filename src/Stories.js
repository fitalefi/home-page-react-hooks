import React from 'react';
import { useFetch } from './hooks';

const Stories = () => {
  const stories = useFetch('https://news-proxy-server.appspot.com/topstories');

  if (!stories) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Stories'>
      {stories.map((story) => {
        const { id, by, time, title, url } = story;
        return (
          <div key={id}>
            <a href={url}>{title}</a>
            <div>
              {by} - {new Date(time * 1000).toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
