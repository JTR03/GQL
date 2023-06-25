import {useState,useEffect} from 'react'
import {useMutation} from '@apollo/client'
import { LOGIN } from '../helper/queries';
import { Link } from 'react-router-dom';

const LoginForm = ({setToken, setErr}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login,result] = useMutation(LOGIN,{
        onError: (error) => {
            setErr(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('sharedStory-token',token)
        }
    }, [result.data]);

    const submit = (e) => {
        e.preventDefault()
        login({variables:{username,password}})
    }

  return (
    <div>
        <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
            Username: <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
            Password: <input value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type='submit'>Login</button>
        <Link to={'/register'}>register</Link>
      </form>
    </div>
  )
}

export default LoginForm
