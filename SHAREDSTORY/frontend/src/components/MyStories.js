import { useQuery } from "@apollo/client";
import {useState} from "react";
import { useMutation } from "@apollo/client";
import { GET_STORIES, MY_STORIES, REMOVE_STORY } from "../helper/queries";
import EditStoy from "./EditStoy";
import ViewStory from "./ViewStory";

const MyStories = () => {
  const [editMode, setEditMode] = useState(false);
  const result = useQuery(MY_STORIES);
   const [remove] = useMutation(REMOVE_STORY, {
     refetchQueries: [{ query: GET_STORIES },{query: MY_STORIES}],
   });

   const onRemove = (id) => {
     remove({ variables: { id } });
   };

  if (result.loading) {
    <div>Loading...</div>;
  }
  if (result.data) {
    const contributions = result.data.me.stories;
    return (
      <div>
        {contributions.length === 0 ? (
          <div>
            <p>
              You have not made any contributions please contribute to a story
            </p>
          </div>
        ) : (
          contributions.map((s) => {
            return (
              editMode ? <EditStoy id={s.id} plot={s.plot} setToView={setEditMode}/> : 
              <div key={s.id}>
                <p>{s.plot}</p>
                <button>{s.topic}</button>
                <button onClick={()=>onRemove(s.id)}>Delete</button>
                <button onClick={()=>setEditMode(true)}>Edit</button>
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default MyStories;




