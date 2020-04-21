import React, { useState } from 'react'

import Login from './../components/authForms/Login'
import Register from './../components/authForms/Register'

const AuthPage = () => {
  const [login, setLogin] = useState('Login')

  const handleComponentState = (evt) => {
    setLogin(evt)
  }

  return (
    <>
      {login === 'Login' ? (
        <Login onChangeComponent={handleComponentState} />
      ) : (
        <Register onChangeComponent={handleComponentState} />
      )}
    </>
  )
}

export default AuthPage
