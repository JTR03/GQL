import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../helper/queries";
import { Link } from "react-router-dom";

const LoginForm = ({ setToken, setErr }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErr(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("sharedStory-token", token);
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
          <input
            className="input"
            placeholder="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            className="input"
            placeholder="Password"
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="button" type="submit">
          Login
        </button>
        
          <p className="text">
            No Account yet?{" "}
            <Link className="link" to={"/register"}>
              register
            </Link>
          </p>
        
      </form>
    </div>
  );
};

export default LoginForm;
