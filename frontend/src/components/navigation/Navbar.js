import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="navigation">
      <div className="navigation__logo">
        <h1>EVENTS-GOGO</h1>
      </div>
      <nav className="navigation__items">
        <ul>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
