import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header">
      <Link to={'/'} className="link">Home</Link>
      <Link to={'/stories'}className="link">All Stories</Link>
      <Link to={'/me'} className="link">My Contributions</Link>
      
      <input className="search" placeholder="Search Topic" />
      <button className="link"> Logout</button>
    </div>
  );
}

export default Header
