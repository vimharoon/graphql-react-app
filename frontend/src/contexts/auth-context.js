import React from 'react'

export default React.createContext({
  isAuthenticated: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
})
