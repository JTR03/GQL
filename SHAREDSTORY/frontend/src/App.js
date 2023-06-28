import { useState } from "react";
import "./App.css";
import LoginForm from "./components/loginForm";
import Notify from "./components/Notify";
import CreateUser from "./components/CreateUser";
import { Route, Routes } from "react-router-dom";
import Stories from "./components/Stories";
import AddToStory from "./components/AddToStory";
import SelectTopic from "./components/SelectTopic";
import AddTopic from "./components/AddTopic";
import StoriesByTopic from "./components/StoriesByTopic";
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(null);
  const [topic, setTopic] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleErrMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  // const match = useMatch('/:topic')
  // const storiesByTopic = match ? stories.filter(s => s.topic === match.params.topic): null

  if (!token) {
    return (
      <div className="App">
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
      <Header />
      <Notify message={errorMessage} />

      <Routes>
        <Route
          path="/add"
          element={<AddToStory topic={topic} setErr={handleErrMessage} />}
        />
        <Route path="/" element={<SelectTopic setTopic={setTopic} />} />
        <Route path="/:topic" element={<StoriesByTopic topic={topic} />} />
        <Route
          path="/stories"
          element={<Stories setErr={handleErrMessage} />}
        />
        <Route
          path="/addTopic"
          element={<AddTopic setErr={handleErrMessage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
