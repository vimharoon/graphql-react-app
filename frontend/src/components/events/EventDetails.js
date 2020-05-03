import React from 'react'

const EventDetails = (props) => {
  return (
    <div className="event-description">
      <div className="description__header">
        <h2>Title</h2>
        <p>description for the event</p>
      </div>
      <div className="creator__description">
        <img src="/images/placeholder-img150x150.png" alt="profile" />
        <p>Creator: toto@test.com</p>
      </div>

      <div className="event__infos">
        <ul>
          <li>date</li>
          <li>time</li>
          <li>duration</li>
          <li>cost</li>
        </ul>
      </div>

      {props.isAuth && (
        <div className="description__footer">
          <div className="form-action">
            <button>Book Event</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetails
