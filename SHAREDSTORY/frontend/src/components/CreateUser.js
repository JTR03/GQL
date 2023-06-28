import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER } from "../helper/queries";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ setErr }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => setErr("successfully register"),
    onError: (error) => {
      if (error === error.graphQLErrors) {
        setErr(error.graphQLErrors[0].message);
      } else setErr(error.message);
    },
  });
  const submit = (e) => {
    e.preventDefault();
    createUser({ variables: { username } });
    setUsername("");
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input
            className="input"
            placeholder="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
