import React from 'react'
import moment from 'moment'

const EventDetails = (props) => {
  return (
    <>
      {!!Object.keys(props.selectedEvent).length ? (
        <div className="event-description">
          <div className="description__header">
            <h2>{props.selectedEvent.title}</h2>
            <p>{props.selectedEvent.description}</p>
          </div>
          <div className="creator__description">
            <img
              height="50px"
              width="50px"
              src="/images/placeholder-img150x150.png"
              alt="profile"
            />
            <p>
              {props.selectedEvent.creator.firstname +
                ' ' +
                props.selectedEvent.creator.lastname}
            </p>
          </div>

          <div className="event__infos">
            <ul>
              <li>{moment(props.selectedEvent.date).format('DD/MM/YYYY')}</li>
              <li>{moment(props.selectedEvent.date).format('h:mm')} h</li>
              <li>$ {props.selectedEvent.price}</li>
            </ul>
          </div>

          {!!props.isAuth.token && (
            <div className="description__footer">
              <div className="form-action">
                {props.isAuth.userId === props.selectedEvent.creator._id ? (
                  <p className="creator-message">
                    You are the creator of this event.
                  </p>
                ) : (
                  <button>Book Event</button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="event-description">
          <div className="description__header">
            <h2>Select a event to view details.</h2>
          </div>
        </div>
      )}
    </>
  )
}

export default EventDetails
