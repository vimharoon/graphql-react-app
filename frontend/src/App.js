import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import Navbar from './components/navigation/Navbar'

import AuthPage from './pages/AuthPage'
import EventsPage from './pages/EventsPage'
import BookingsPage from './pages/BookingsPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/bookings" component={BookingsPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
