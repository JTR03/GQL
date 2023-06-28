import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { STORIES_BY_TOPIC } from "../helper/queries";

const StoriesByTopic = ({ topic }) => {
  const result = useQuery(STORIES_BY_TOPIC, {
    variables: { topic },
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }
  if (result.data) {
    return (
      <div>
        <h3>{topic}</h3>
        {result.data.storiesByTopic.map((s) => {
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
};

export default StoriesByTopic;
