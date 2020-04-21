import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import { AuthContext } from './contexts'

import Navbar from './components/navigation/Navbar'

import AuthPage from './pages/AuthPage'
import EventsPage from './pages/EventsPage'
import BookingsPage from './pages/BookingsPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const [auth, setAuth] = useState({ token: null, userId: null })

  const hadleLogin = (token, userId) => {
    setAuth({ token: token, userId: userId })
  }

  const handeLogout = () => {
    setAuth({ token: null, userId: null })
  }

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token: auth.token,
          userId: auth.userId,
          login: hadleLogin,
          logout: handeLogout,
        }}
      >
        <Navbar />
        <main className="main-content">
          <Switch>
            {!auth.token && <Redirect exact from="/" to="/auth" />}
            {auth.token && <Redirect exact from="/" to="/events" />}
            {auth.token && <Redirect exact from="/auth" to="/events" />}
            {!auth.token && <Route path="/auth" component={AuthPage} />}
            <Route path="/events" component={EventsPage} />
            {auth.token && <Route path="/bookings" component={BookingsPage} />}

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </main>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
