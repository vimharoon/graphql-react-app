import React from 'react'
import moment from 'moment'

import { useFetchApi } from './../../hooks'

const EventsList = (props) => {
  const eventsData = useFetchApi('http://localhost:8080/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `query {
                events{
                  _id
                  title
                  description
                  price
                  date
                  creator {
                    _id
                    firstname
                    lastname
                  }
                }
              }`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (
    <>
      {eventsData.apiRes.respData &&
        eventsData.apiRes.respData.map((event) => (
          <li
            key={event._id}
            className={
              props.currentUserId === event.creator._id
                ? 'event-list__items not-clickable'
                : 'event-list__items'
            }
            onClick={props.onEventSelection.bind(null, event)}
          >
            <div className="event__item__date">
              <span>{moment(event.date).format('ddd')}</span>
              <span>{moment(event.date).format('DD')}</span>
            </div>
            <hr />
            <div className="event__item__title-price">
              <span>{event.title}</span>
              <span>Total cost ${event.price}</span>
            </div>
          </li>
        ))}
    </>
  )
}

export default EventsList
