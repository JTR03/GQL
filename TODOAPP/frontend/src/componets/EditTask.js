import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_TASK } from "../helpers/queries";

const EditTask = ({ val, id }) => {
  const [edited, setEdited] = useState(val);
  const [checked, setChecked] = useState(false);
//   const keyPress = (e) => {
//     if (e.key === "Enter" || e.key === "Escape") {
//       e.target.blur();
//     }
//   };
  const [edit] = useMutation(EDIT_TASK);

  const handleBlur =()=>{
    edit({variables:{id,task: edited}})
  }

  const handleCheck = ()=>{
    setChecked(!checked)
  }
  return (
    <div>
        <input type="checkbox" checked={checked} onChange={handleCheck}/>
      <input
      className="edit"
      style={{textDecoration:checked ?'line-through':null}}
        type="text"
        aria-label="task"
        value={edited}
        onChange={({ target }) => setEdited(target.value)}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default EditTask;
