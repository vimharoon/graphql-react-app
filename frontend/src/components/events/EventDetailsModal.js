import React from 'react'

import Modal from './../popups/Modal'

const EventDetailsModal = (props) => {
  return (
    <>
      {props.isOpen.showEventDetail && (
        <Modal title="Event Details" onCancel={props.closeEventDetails}>
          <div className="event-description-modal">
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
        </Modal>
      )}
    </>
  )
}

export default EventDetailsModal
