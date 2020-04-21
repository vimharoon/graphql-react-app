import React from 'react'

import { useForm } from './../../hooks'

const RegisterFrom = (props) => {
  const { values, handleChange, handleSubmit } = useForm(register)

  function register() {
    registerRequest(values).then((resData) => {
      console.log(resData)
    })
  }

  const registerRequest = async ({ firstname, lastname, email, password }) => {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `mutation {
                  createUser(userInput: {
                    firstname: "${firstname}",
                    lastname: "${lastname}",
                    email: "${email}",
                    password: "${password}"
                  }) {
                    email
                  }
                }`,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    return await response.json()
  }

  return (
    <div className="auth-page-register">
      <h2 className="page-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="firstname">First name: </label>
          <input
            placeholder="Your first name please 👶"
            onChange={handleChange}
            value={values.firstname || ''}
            name="firstname"
            type="text"
            id="firstname"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="lastname">Last name: </label>
          <input
            placeholder="Your last name please 👼"
            onChange={handleChange}
            value={values.lastname || ''}
            name="lastname"
            type="text"
            id="lastname"
            required
          />
        </div>

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
          <button type="submit">Register</button>
          <button
            type="button"
            onClick={() => props.onChangeComponent('Login')}
          >
            Already have an account ?
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterFrom
