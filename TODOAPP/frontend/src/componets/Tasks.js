import React from "react";
import EditTask from "./EditTask";


const Tasks = ({ tasks }) => {
  
 

  
  return (
    <>
      {tasks.map((t) => (
        // <li key={t.id}>{t.task}</li>
        <EditTask key={t.id} val={t.task} id={t.id}/>
      ))}
    </>
  );
};

export default Tasks;
