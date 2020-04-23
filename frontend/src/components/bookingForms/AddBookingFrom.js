import React from 'react'

import Modal from './../popups/Modal'

const AddEventForm = (props) => {
  return (
    <Modal
      title="Add Booking"
      onCancel={props.cancelBookingCreation}
      onConfirm={props.confirmBookingCreation}
    >
      <form>
        <div className="form-control">
          <label htmlFor="email">E-mail: </label>
          <input
            placeholder="Your email please 📧"
            // onChange={handleChange}
            // value={values.email || ''}
            name="email"
            type="email"
            id="email"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password: </label>
          <input
            placeholder="Your password please 💮"
            // onChange={handleChange}
            // value={values.password || ''}
            name="password"
            type="password"
            id="password"
            required
          />
        </div>
      </form>
    </Modal>
  )
}

export default AddEventForm
