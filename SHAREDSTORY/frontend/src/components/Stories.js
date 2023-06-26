import { useMutation, useQuery } from "@apollo/client";
import {useState} from "react";
import { GET_STORIES, REMOVE_STORY } from "../helper/queries";
import { Link } from "react-router-dom";
import EditStoy from "./EditStoy";
import ViewStory from "./ViewStory";

const Stories = ({setErr}) => {
  const [editMode, setEditMode] = useState(false);
  const result = useQuery(GET_STORIES);
  const [remove] = useMutation(REMOVE_STORY,{
    refetchQueries:[{query:GET_STORIES}]
  })

  const onRemove = (id) =>{
    remove({variables:{id}})
  }

  const handleEditMode = ()=>{
    setEditMode(!editMode)
  }

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
              {editMode ? <EditStoy id={s.id} plot={s.plot} setErr={setErr} setToView={handleEditMode}/>: <ViewStory plot={s.plot} setToEdit={handleEditMode}/>}
              
              
              <button onClick={()=>onRemove(s.id)}>Delete</button>
            </div>
          );
        })}
        <Link to={'/add'}>Add To Story</Link>
        
      </div>
    );
  }
};

export default Stories;
