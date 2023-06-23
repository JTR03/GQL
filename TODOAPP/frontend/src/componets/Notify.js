import React from "react";

const Notify = ({ message }) => {
  return (
    <div style={{ color: "red" }}>
      <p>{message}</p>
    </div>
  );
};

export default Notify;
