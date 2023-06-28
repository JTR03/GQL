import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_STORY, GET_STORIES } from "../helper/queries";

const AddToStory = ({topic,setErr }) => {
  const [story, setStory] = useState("");
  const [addStory] = useMutation(ADD_STORY, {
    onError: (error) => {
      if(error.graphQLErrors){
        setErr(error.graphQLErrors[0].message);
      }else{
        setErr(error.message)
      }
      
    },
    refetchQueries: [{ query: GET_STORIES }],
  });

  const submit = (e) => {
    e.preventDefault();
    addStory({ variables: { topic, plot: story } });
    setStory("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        {/* <div>
          <input
            type="text"
            placeholder="Character"
            value={character}
            onChange={({ target }) => setCharacter(target.value)}
          />
        </div>*/}
        <div> 
          <textarea
            value={story}
            placeholder="Your pat in the story"
            onChange={({ target }) => setStory(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddToStory;
