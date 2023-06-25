import { useMutation } from '@apollo/client';
import {useState} from 'react'
import { CREATE_USER } from '../helper/queries';

const CreateUser = ({setErr}) => {
    const [username, setUsername] = useState('');
    const [createUser] = useMutation(CREATE_USER,{
        onError:(error)=>{
            setErr(error.graphQLErrors[0].message)
        }
    })
const submit = (e) =>{
  e.preventDefault()
  createUser({variables:{username}})
}
  return (
    <div>
      <form onSubmit={submit}>
        <div>
            Username: <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default CreateUser
