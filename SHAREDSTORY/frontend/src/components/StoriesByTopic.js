import React from 'react'
import { Link } from 'react-router-dom';

const StoriesByTopic = ({topic,stories}) => {
  return (
    <div>
      <h3>{topic}</h3>
      {stories.map((s) => {
        return (
          <div key={s.id}>
            <p>{s.plot}</p>
          </div>
        );
      })}
      <Link to={"/add"}>Add To Story</Link>
    </div>
  );
}

export default StoriesByTopic
