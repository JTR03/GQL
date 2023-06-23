import { useState } from "react";
import "./App.css";
import LoginForm from "./componets/LoginForm";
import Notify from "./componets/Notify";
import { useApolloClient, useQuery } from "@apollo/client";
import RegisterForm from "./componets/RegisterForm";
import { GET_TASK } from "./helpers/queries";
import Tasks from "./componets/Tasks";
import AddTasks from "./componets/AddTasks";
import { Route, Routes } from "react-router-dom";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const result = useQuery(GET_TASK);

  const handleErrMessages = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div className="App">
        <div className="App-header">
          <Notify message={errorMessage} />
          <Routes>
            <Route
              path="/"
              element={
                <LoginForm setToken={setToken} setError={handleErrMessages} />
              }
            />
            <Route
              path="/register"
              element={<RegisterForm setError={errorMessage} />}
            />
          </Routes>
        </div>
      </div>
    );
  }
  if (result.loading) {
    return <div className="App-header">Loading...</div>;
  }
  if (result.data) {
    return (
      <div className="App">
        <div className="App-header">
          <Notify message={errorMessage} />
          <AddTasks setErr={handleErrMessages} />
          <Tasks tasks={result.data.me.activities} />
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default App;
