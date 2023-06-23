import React from "react";

const Tasks = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>{t.task}</li>
      ))}
    </ul>
  );
};

export default Tasks;
