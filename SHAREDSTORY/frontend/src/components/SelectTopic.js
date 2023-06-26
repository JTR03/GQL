import { useQuery } from "@apollo/client";
import React from "react";
import { SELECT_TOPIC } from "../helper/queries";
import { Link } from "react-router-dom";

const SelectTopic = () => {
  const result = useQuery(SELECT_TOPIC);

  if (result.loading) {
    return <div>Loading...</div>;
  }
  if (result.data) {
    return (
      <div>
        {result.data.allTopics.map((t) => {
          return (
            <div>
              <button>{t.topic}</button>
            </div>
          );
        })}
        <Link to={'/addTopic'}>Add Topic</Link>
      </div>
    );
  }
};

export default SelectTopic;
