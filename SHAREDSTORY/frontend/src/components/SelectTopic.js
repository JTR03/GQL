import { useQuery } from "@apollo/client";
import React from "react";
import { SELECT_TOPIC } from "../helper/queries";
import { Link, useNavigate } from "react-router-dom";

const SelectTopic = () => {
  const navigate = useNavigate()
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
              <button onClick={()=>navigate('/stories')}>{t.topic}</button>
            </div>
          );
        })}
        <Link to={'/addTopic'}>Add Topic</Link>
      </div>
    );
  }
};

export default SelectTopic;
