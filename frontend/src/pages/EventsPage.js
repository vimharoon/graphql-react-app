import React, { useState, useContext } from 'react'

import { AuthContext } from './../contexts'
// import { useWindowDimensions } from './../hooks'
import AddEventFrom from './../components/events/AddEventFrom'
import EventsList from './../components/events/EventsList'
import EventDetails from './../components/events/EventDetails'

const EventsPage = () => {
  const [isOpen, setIsOpen] = useState({ addEvent: false })
  //  const { height, width } = useWindowDimensions()
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

  // if (width <= 880) {
  //   console.log(`height: ${height}; width:${width}`)
  // }

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
          <EventDetails />
        </section>
      </div>
    </>
  )
}

export default EventsPage
