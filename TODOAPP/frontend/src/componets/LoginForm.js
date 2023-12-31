import React, { useState, useEffect } from "react";
import "../App.css";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../helpers/queries";
import { Link } from "react-router-dom";

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("noteApp-token", token);
    }
  }, [result.data]);

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username:{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <Link className="link" to={'/register'}>Register here</Link>
      </form>
    </div>
  );
};

export default LoginForm;
