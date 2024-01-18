import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={'/'}>
          <span className="logo"> LOGO </span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
