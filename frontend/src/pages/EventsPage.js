import React, { useState, useContext } from 'react'

import { AuthContext } from './../contexts'
import { useWindowDimensions } from './../hooks'
import AddEventFrom from './../components/events/AddEventFrom'
import EventsList from './../components/events/EventsList'
import EventDetails from './../components/events/EventDetails'
import EventDetailsModal from './../components/events/EventDetailsModal'

const EventsPage = () => {
  const [isOpen, setIsOpen] = useState({
    addEvent: false,
    showEventDetail: false,
  })
  const { width } = useWindowDimensions()
  const authContext = useContext(AuthContext)

  const addNewEvent = () => {
    setIsOpen({ addEvent: true, showEventDetail: false })
  }

  const openEventDetail = () => {
    setIsOpen({ addEvent: false, showEventDetail: true })
  }

  const cancelEventCreation = () => {
    setIsOpen({ addEvent: false, showEventDetail: false })
  }

  const closeEventDetails = () => {
    setIsOpen({ addEvent: false, showEventDetail: false })
  }

  const confirmEventCreation = () => {
    setIsOpen({ addEvent: false, showEventDetail: false })
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
              <EventsList onEventSelection={openEventDetail} />
            </ul>
          </div>
          {width >= 880 ? (
            <EventDetails isAuth={!!authContext.token} />
          ) : (
            <EventDetailsModal
              isOpen={isOpen}
              isAuth={!!authContext.token}
              closeEventDetails={closeEventDetails}
            />
          )}
        </section>
      </div>
    </>
  )
}

export default EventsPage
