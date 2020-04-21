import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>Lost in space ?</h1>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  )
}

export default NotFoundPage
