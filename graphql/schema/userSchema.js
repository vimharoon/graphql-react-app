module.exports = `
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String
    createdEvent: [Event!]
  }

  type UserAuthData {
    userId: ID!
    firstname: String!
    lastname: String!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String
  }
`
