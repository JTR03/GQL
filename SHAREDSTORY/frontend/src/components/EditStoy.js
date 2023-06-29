import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_STORY, GET_STORIES } from "../helper/queries";

const EditStoy = ({ setErr, id, plot,setToView }) => {
  const [edited, setEdited] = useState(plot);
  const [editStory] = useMutation(EDIT_STORY, {
    onError: (error) => {
      setErr(error.graphQLErrors[0].message);
    },
    refetchQueries:[{query:GET_STORIES}]
  });

  const submit = () => {
    editStory({ variables: { plot: edited, id } });
    setToView(false)
  };

  const onCancel = () => {
    setEdited(plot)
    setToView(false)
  }

  return (
    <div>
      <div>
        <textarea
          value={edited}
          onChange={({ target }) => setEdited(target.value)}
        />
      </div>
      <button className="success" onClick={submit}>OK</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditStoy;
