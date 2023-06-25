import logo from './logo.svg';
import {useState} from 'react'
import './App.css';
import LoginForm from './components/loginForm';
import Notify from './components/Notify';
import CreateUser from './components/CreateUser';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleErrMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  }

  if(!token){
    return (
      <div className="App-header">
        <Notify message={errorMessage} />
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm setToken={setToken} setErr={handleErrMessage} />
            }
          />
          <Route
            path="/register"
            element={<CreateUser setErr={handleErrMessage} />}
          />
        </Routes>
      </div>
    );
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
      </header>
    </div>
  );
}

export default App;
