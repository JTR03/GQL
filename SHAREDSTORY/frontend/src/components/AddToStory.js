import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_STORY, GET_STORIES } from "../helper/queries";

const AddToStory = ({ setErr }) => {
  const [character, setCharacter] = useState("");
  const [story, setStory] = useState("");
  const [addStory] = useMutation(ADD_STORY, {
    onError: (error) => {
      setErr(error.graphQLErrors[0].message);
    },
    refetchQueries: [{ query: GET_STORIES }],
  });

  const submit = (e) => {
    e.preventDefault();
    addStory({ variables: { character, plot: story } });
    setCharacter("");
    setStory("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            placeholder="Character"
            value={character}
            onChange={({ target }) => setCharacter(target.value)}
          />
        </div>
        <div>
          <textarea
            value={story}
            placeholder="Your pat in the story"
            onChange={({ target }) => setStory(target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddToStory;
