import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, EDIT_TASK, GET_TASK } from "../helpers/queries";

const EditTask = ({ val, id }) => {
  const [edited, setEdited] = useState(val);
  const [checked, setChecked] = useState(false);
  //   const keyPress = (e) => {
  //     if (e.key === "Enter" || e.key === "Escape") {
  //       e.target.blur();
  //     }
  //   };
  const [edit] = useMutation(EDIT_TASK);
  const [remove] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASK }],
  });

  const handleBlur = () => {
    edit({ variables: { id, task: edited } });
  };

  const handleRemove = () => {
    remove({ variables: { id } });
  };
  const handleCheck = () => {
    setChecked(!checked);
  };
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleCheck} />
      <input
        className="edit"
        style={{ textDecoration: checked ? "line-through" : null }}
        type="text"
        aria-label="task"
        value={edited}
        onChange={({ target }) => setEdited(target.value)}
        onBlur={handleBlur}
      />
      <button onClick={handleRemove}>delete</button>
    </div>
  );
};

export default EditTask;
