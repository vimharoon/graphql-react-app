import React, { useContext } from 'react'

import { useForm } from './../../hooks'
import { AuthContext } from './../../contexts'

const LoginFrom = (props) => {
  const { values, handleChange, handleSubmit } = useForm(login)

  const authContext = useContext(AuthContext)

  function login() {
    loginRequest(values).then((userData) => {
      if (!userData.errors) {
        authContext.login({ ...userData.data.login.token })
      }
    })
  }

  const loginRequest = async ({ email, password }) => {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
                login(email: "${email}", password: "${password}")
                  {
                    userId
                    firstname
                    lastname
                    token
                    tokenExpiration
                  }
                }`,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
  }

  return (
    <div className="auth-page-login">
      <h2 className="page-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">E-mail: </label>
          <input
            placeholder="Your email please 📧"
            onChange={handleChange}
            value={values.email || ''}
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
            onChange={handleChange}
            value={values.password || ''}
            name="password"
            type="password"
            id="password"
            required
          />
        </div>

        <div className="form-action">
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() => props.onChangeComponent('Register')}
          >
            Not yet have an account ?
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginFrom
