import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER } from "../helpers/queries";

const RegisterForm = ({setError}) => {
    const [username, setUsername] = useState('');
    const [register] = useMutation(CREATE_USER,{
      onError: (error) => {
        setError(error.graphQLErrors[0].message)
      }
    })

    const submit = (e)=>{
      e.preventDefault()
      register({variables:{username}})
    }
  return (
    <div>
        <form onSubmit={submit}>
            <div>
                Username: <input value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <button type="submit">Register</button>
        </form>
      
    </div>
  )
}

export default RegisterForm
