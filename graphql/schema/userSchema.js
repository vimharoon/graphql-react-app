module.exports = `
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvent: [Event!]
  }

  type UserAuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    email: String!
    password: String
  }
`
