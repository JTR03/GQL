import React from 'react'
import { GET_STORIES, REMOVE_STORY } from "../helper/queries";
import { useMutation } from '@apollo/client';

const ViewStory = ({plot,setToEdit,id}) => {
     const [remove] = useMutation(REMOVE_STORY, {
       refetchQueries: [{ query: GET_STORIES }],
     });

     const onRemove = () => {
       remove({ variables: { id } });
     };
  return (
    <div>
      <p>{plot}</p>
      <button onClick={setToEdit}>Edit</button>
      <button onClick={onRemove}>Delete</button>
    </div>
  );
}

export default ViewStory
