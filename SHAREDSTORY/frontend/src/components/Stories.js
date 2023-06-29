import { useQuery } from "@apollo/client";
import { GET_STORIES } from "../helper/queries";

const Stories = ({ setErr }) => {
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
              <p>{s.plot}</p>
              <button>{s.topic}</button>
            </div>
          );
        })}
       
      </div>
    );
  }
};

export default Stories;
