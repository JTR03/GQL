import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ logout, search,setSearch }) => {
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    navigate('/result')
  }
  return (
    <div className="header">
      <Link to={"/"} className="link">
        Home
      </Link>
      <Link to={"/stories"} className="link">
        All Stories
      </Link>
      <Link to={"/me"} className="link">
        My Contributions
      </Link>
    <form onSubmit={submit}>
      <input
        className="search"
        placeholder="Search Topic"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
    </form>
      
      <button onClick={logout} className="link">
        {" "}
        Logout
      </button>
    </div>
  );
};

export default Header;
