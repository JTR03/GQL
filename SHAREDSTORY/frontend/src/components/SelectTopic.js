import { useQuery } from "@apollo/client";
import { SELECT_TOPIC } from "../helper/queries";
import { Link, useNavigate } from "react-router-dom";

const SelectTopic = ({setTopic}) => {
  const navigate = useNavigate()
  const result = useQuery(SELECT_TOPIC);

  const onClick = (topic) =>{
    navigate(topic);
    setTopic(topic)
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }
  if (result.data) {
    return (
      <div>
        {result.data.allTopics.map((t) => {
          return (
            <div key={t.id}>
              <button onClick={()=>onClick(t.topic)}
               
                >{t.topic}</button>
            </div>
          );
        })}
        <Link to={'/addTopic'}>Add Topic</Link>
      </div>
    );
  }
};

export default SelectTopic;
