import React, { useState } from 'react'

import AddEventFrom from './../components/eventForms/AddEventFrom'

const EventsPage = () => {
  const [isOpen, setIsOpen] = useState({ addEvent: false })

  const addNewEvent = () => {
    setIsOpen({ addEvent: true })
  }

  const cancelEventCreation = () => {
    setIsOpen({ addEvent: false })
  }

  const confirmEventCreation = () => {
    setIsOpen({ addEvent: false })
  }
  //onSubmit={handleSubmit}

  return (
    <>
      {isOpen.addEvent && (
        <AddEventFrom
          cancelEventCreation={cancelEventCreation}
          confirmEventCreation={confirmEventCreation}
        />
      )}
      <div className="events-page">
        <div className="events-actions">
          <div className="form-action">
            <button type="submit">
              <i data-eva="funnel" data-eva-fill="#f6f7f8"></i>
              Filter
            </button>
          </div>
          <h2>Events</h2>
          <div className="form-action" onClick={addNewEvent}>
            <button type="submit">
              <i data-eva="plus" data-eva-fill="#f6f7f8"></i> Add Event
            </button>
          </div>
        </div>
        <div className="event-content">
          <div className="event-list">
            <ul>
              <li>zeaze</li>
              <li>eaze</li>
              <li>eaze</li>
            </ul>
          </div>

          <div className="event-description">toto have description</div>
        </div>
      </div>
    </>
  )
}

export default EventsPage
