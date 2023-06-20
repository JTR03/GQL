import React,{useState} from 'react'
import '../App.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className="App-header">
      <h2>Login</h2>
      <form>
        <div>
            Username: <input value={username} onChange={({target})=>setUsername(target.value)} />
        </div>
        <div>
            Password: <input type='password' value={password} onChange={({target})=>setPassword(target.value)} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
