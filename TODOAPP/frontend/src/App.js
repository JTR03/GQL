import logo from './logo.svg';
import {useState} from 'react'
import './App.css';
import LoginForm from './componets/LoginForm';
import Notify from './componets/Notify'
import { useApolloClient } from '@apollo/client';
import RegisterForm from './componets/RegisterForm';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient()

  const handleErrMessages = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  }

  const logout = ()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return (
      <div className="App">
        <Notify message={errorMessage}/>
        {/* <LoginForm setToken={setToken} setError={handleErrMessages}/> */}
        <RegisterForm setError={errorMessage} />
      </div>
    )     
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={logout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
