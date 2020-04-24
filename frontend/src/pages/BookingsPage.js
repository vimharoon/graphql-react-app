import React, { useState } from 'react'

import AddBookingFrom from './../components/bookings/AddBookingFrom'

const BookingsPage = () => {
  const [isOpen, setIsOpen] = useState({ addBooking: false })

  const addNewBooking = () => {
    setIsOpen({ addBooking: true })
  }

  const cancelBookingCreation = () => {
    setIsOpen({ addBooking: false })
  }

  const confirmBookingCreation = () => {
    setIsOpen({ addBooking: false })
  }

  return (
    <>
      {isOpen.addBooking && (
        <AddBookingFrom
          cancelBookingCreation={cancelBookingCreation}
          confirmBookingCreation={confirmBookingCreation}
        />
      )}
      <div className="events-page">
        <div className="events-actions">
          <div className="form-action">
            <button>Filter</button>
          </div>
          <h2>Bookings</h2>
          <div className="form-action" onClick={addNewBooking}>
            <button>Add Booking</button>
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

export default BookingsPage
