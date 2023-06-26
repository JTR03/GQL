import React from 'react'

const ViewStory = ({plot,setToEdit}) => {
  return (
    <div>
      <p>{plot}</p>
      <button onClick={setToEdit}>Edit</button>
    </div>
  );
}

export default ViewStory
