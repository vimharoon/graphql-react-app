import React from 'react'

import { useForm } from './../../hooks'
import Modal from './../popups/Modal'

const AddEventForm = (props) => {
  const { values, handleChange, handleSubmit } = useForm(addEvent)

  function addEvent() {
    if (!Object.keys(values).length) {
      return
    }
    eventCreationRequest(values).then((eventDate) => {
      if (!eventDate.errors) {
        props.confirmEventCreation()
      }
    })
  }

  const eventCreationRequest = async ({ title, price, date, description }) => {
    const { token } = JSON.parse(localStorage.getItem('auth'))
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `mutation {
                  createEvent(eventInput: {title: "${title}", price: ${+price}, date: "${date}", description: "${description}"})
                  {
                    _id
                    title
                    description
                    price
                    date
                    creator {
                      email
                    }
                  }
                }`,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  }

  return (
    <Modal
      title="Add Event"
      onCancel={props.cancelEventCreation}
      onConfirm={handleSubmit}
    >
      <form>
        <div className="form-control">
          <label htmlFor="title">Title of event:</label>
          <input
            placeholder="Title of your event please 💮"
            onChange={handleChange}
            value={values.title || ''}
            name="title"
            type="text"
            id="title"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="price">Price of event:</label>
          <input
            placeholder="Price of your event please 💮"
            onChange={handleChange}
            value={values.price || ''}
            name="price"
            type="number"
            id="price"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="date">Date of event:</label>
          <input
            placeholder="Date of your event please 💮"
            onChange={handleChange}
            value={values.date || ''}
            name="date"
            type="datetime-local"
            id="date"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="description">Description of event:</label>
          <input
            placeholder="Description of your event please 💮"
            onChange={handleChange}
            value={values.description || ''}
            name="description"
            type="text"
            id="description"
            required
          />
        </div>
      </form>
    </Modal>
  )
}

export default AddEventForm
