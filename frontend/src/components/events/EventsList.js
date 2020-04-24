import React, { useState, useEffect } from 'react'

const EventsList = () => {
  const [events, setEvents] = useState({ eventsList: [] })

  useEffect(() => {
    getEvents().then((eventDate) => {
      if (!eventDate.errors) {
        setEvents({ eventsList: eventDate.data.events })
      }
    })
  }, [])

  const getEvents = async () => {
    const response = await fetch('http://localhost:8080/graphql', {
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
                      email
                    }
                  }
                }`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await response.json()
  }

  return (
    <>
      {events.eventsList &&
        events.eventsList.map((event) => (
          <li key={event._id} className="event-list__items">
            <div className="event__item__date">
              <span>Mon</span>
              <span>11</span>
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
