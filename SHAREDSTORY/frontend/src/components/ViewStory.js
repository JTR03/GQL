import React from 'react'
import { Link } from 'react-router-dom';

const ViewStory = ({plot,tag,setToEdit,id}) => {
    
  return (
    <div>
      <p>{plot}</p>
      <Link to={`/${tag}`}>{tag}</Link>
      {/* <button>{tag}</button> */}
      {/* <button onClick={setToEdit}>Edit</button>*/}
     
    </div>
  );
}

export default ViewStory
