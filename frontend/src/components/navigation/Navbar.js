import React from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from './../../contexts'

const Navbar = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <header className="navigation">
            <div className="navigation__logo">
              <h1>EVENTS-GOGO</h1>
            </div>
            <nav className="navigation__items">
              <ul>
                {!context.token && (
                  <li>
                    <NavLink to="/auth">Login</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
                {context.token && (
                  <>
                    <li>
                      <NavLink to="/bookings">Bookings</NavLink>
                    </li>
                    <li>
                      <NavLink to="/auth" onClick={context.logout}>
                        Logout
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </header>
        )
      }}
    </AuthContext.Consumer>
  )
}

export default Navbar
