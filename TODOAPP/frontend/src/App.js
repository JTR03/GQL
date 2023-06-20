import logo from './logo.svg';
import {useState} from 'react'
import './App.css';
import LoginForm from './componets/LoginForm';

function App() {
  const [token, setToken] = useState(null);

  if(!token){
    return (

      <div className="App">
        <LoginForm />
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
      </header>
    </div>
  );
}

export default App;
