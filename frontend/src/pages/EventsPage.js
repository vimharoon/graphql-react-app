import React, { useState, useContext } from 'react'

import { AuthContext } from './../contexts'
import AddEventFrom from './../components/events/AddEventFrom'
import EventsList from './../components/events/EventsList'

const EventsPage = () => {
  const [isOpen, setIsOpen] = useState({ addEvent: false })
  const authContext = useContext(AuthContext)

  const addNewEvent = () => {
    setIsOpen({ addEvent: true })
  }

  const cancelEventCreation = () => {
    setIsOpen({ addEvent: false })
  }

  const confirmEventCreation = () => {
    setIsOpen({ addEvent: false })
  }

  return (
    <>
      {isOpen.addEvent && (
        <AddEventFrom
          cancelEventCreation={cancelEventCreation}
          confirmEventCreation={confirmEventCreation}
        />
      )}

      <div className="events-page">
        {!!authContext.token && (
          <div className="events-actions">
            <div className="form-action">
              <button>Filter</button>
            </div>
            <h2>Events</h2>
            <div className="form-action" onClick={addNewEvent}>
              <button>Add Event</button>
            </div>
          </div>
        )}
        <section className="event-content">
          <div className="events-list">
            <ul>
              <EventsList />
            </ul>
          </div>

          <div className="event-description">
            <img src="/images/event-pic.jpg" alt="event with people" />
          </div>
        </section>
      </div>
    </>
  )
}

export default EventsPage
