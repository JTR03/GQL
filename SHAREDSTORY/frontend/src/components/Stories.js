import { useQuery } from "@apollo/client";
import React from "react";
import { GET_STORIES } from "../helper/queries";
import { Link } from "react-router-dom";

const Stories = () => {
  const result = useQuery(GET_STORIES);

  if (result.loading) {
    return <div>Loading...</div>;
  }
  if (result.data) {
    return (
      <div>
        {result.data.allStories.map((s) => {
          return (
            <div key={s.id}>
              <h5>{s.character}</h5>
              <p>{s.plot}</p>
            </div>
          );
        })}
        <Link to={'/add'}>Add To Story</Link>
        
      </div>
    );
  }
};

export default Stories;
