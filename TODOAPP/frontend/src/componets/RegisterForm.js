import { useState } from "react";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
  return (
    <div>
        <form>
            <div>
                Username: <input value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <button type="submit">Register</button>
        </form>
      
    </div>
  )
}

export default RegisterForm
