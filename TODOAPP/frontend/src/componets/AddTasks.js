import { useMutation } from '@apollo/client';
import React,{useState} from 'react'
import { ADD_TASK, GET_TASK } from '../helpers/queries';

const AddTasks = ({setErr}) => {
    const [task, setTask] = useState('');
    const [addTask] = useMutation(ADD_TASK,{
        onError: (error)=>{
            setErr(error.graphQLErrors[0].message)
        },
        refetchQueries:[{query:GET_TASK}]
    }
        )

    const submit = (e) => {
        e.preventDefault()
        addTask({variables:{task}})
    }
  return (
    <div>
      <form onSubmit={submit}>
        ADD TASK: <input value={task} onChange={({target})=>setTask(target.value)} />
        <button type='submit'>Submit</button>
      </form>
      
    </div>
  )
}

export default AddTasks
