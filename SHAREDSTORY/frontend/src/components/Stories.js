import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_STORIES } from "../helper/queries";
import { Link } from "react-router-dom";
import EditStoy from "./EditStoy";
import ViewStory from "./ViewStory";

const Stories = ({ setErr }) => {
  const [editMode, setEditMode] = useState(false);
  const result = useQuery(GET_STORIES);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  if (result.loading) {
    return <div>Loading...</div>;
  }
  if (result.data) {
    return (
      <div>
        {result.data.allStories.map((s) => {
          return (
            <div key={s.id}>
              {editMode ? (
                <EditStoy
                  id={s.id}
                  plot={s.plot}
                  setErr={setErr}
                  setToView={handleEditMode}
                />
              ) : (
                <ViewStory plot={s.plot} setToEdit={handleEditMode} id={s.id} />
              )}
            </div>
          );
        })}
        <Link to={"/add"}>Add To Story</Link>
      </div>
    );
  }
};

export default Stories;
