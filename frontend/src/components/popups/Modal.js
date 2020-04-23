import React from 'react'

import Backdrop from './Backdrop'

const Modal = (props) => {
  return (
    <>
      <Backdrop />
      <div className="modal">
        <header className="modal__header">
          <h2>{props.title}</h2>
        </header>
        <section className="modal__content">{props.children}</section>
        <section className="modal__actions">
          {props.onCancel && (
            <div className="form-action" onClick={props.onCancel}>
              <button type="submit">Cancel</button>
            </div>
          )}
          {props.onConfirm && (
            <div className="form-action" onClick={props.onCancel}>
              <button type="submit">Confirm</button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Modal
