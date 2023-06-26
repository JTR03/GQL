import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_TOPIC, SELECT_TOPIC } from "../helper/queries";
import { useNavigate } from "react-router-dom";

const AddTopic = ({ setErr }) => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [addTopic] = useMutation(ADD_TOPIC, {
    onError: (error) => {
      if (error.graphQLErrors) {
        setErr(error.graphQLErrors[0].message);
      } else {
        setErr(error.message);
      }
    },
    refetchQueries: [{ query: SELECT_TOPIC }],
  });

  const submit = (e) => {
    e.preventDefault();
    addTopic({ variables: { topic } });
    setTopic("");
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={submit}>
        Topic:{" "}
        <input
          value={topic}
          onChange={({ target }) => setTopic(target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTopic;
