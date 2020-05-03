import React, { useState, useContext } from 'react'

import { AuthContext } from './../contexts'
import { useWindowDimensions } from './../hooks'
import AddEventFrom from './../components/events/AddEventFrom'
import EventsList from './../components/events/EventsList'
import EventDetails from './../components/events/EventDetails'
import EventDetailsModal from './../components/events/EventDetailsModal'

const EventsPage = () => {
  const [state, setState] = useState({ addEvent: false, event: {} })
  const { width } = useWindowDimensions()
  const authContext = useContext(AuthContext)

  const addNewEvent = () => {
    setState({ addEvent: true, event: {} })
  }

  const openEventDetail = (event) => {
    setState({ addEvent: false, event: event })
  }

  const cancelEventCreation = () => {
    setState({ addEvent: false, event: {} })
  }

  const closeEventDetails = () => {
    setState({ addEvent: false, event: {} })
  }

  const confirmEventCreation = () => {
    setState({ addEvent: false, event: {} })
  }

  return (
    <>
      {state.addEvent && (
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
              <EventsList
                currentUserId={authContext.userId}
                onEventSelection={openEventDetail}
              />
            </ul>
          </div>
          {width >= 880 ? (
            <EventDetails selectedEvent={state.event} isAuth={authContext} />
          ) : (
            <EventDetailsModal
              isOpen={state}
              isAuth={authContext}
              selectedEvent={state.event}
              closeEventDetails={closeEventDetails}
            />
          )}
        </section>
      </div>
    </>
  )
}

export default EventsPage
