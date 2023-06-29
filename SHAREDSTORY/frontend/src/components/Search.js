import { useQuery } from "@apollo/client";
import React from "react";
import { SEARCH } from "../helper/queries";

const Search = ({ topic }) => {
  const result = useQuery(SEARCH, { variables: { topic } });

  if (result.loading) {
    return <div>Loading...</div>;
  }
  if (result.data) {
    const searchResult = result.data.storiesByTopic;
    return (
      <div>
        {searchResult.length === 0 ? (
          <p>No result Found</p>
        ) : (
          searchResult.map((s) => {
            return (
              <div key={s.id}>
                <p>{s.plot}</p>
                <button>{s.topic}</button>
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default Search;
