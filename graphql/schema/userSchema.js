module.exports = `
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvent: [Event!]
  }

  input UserInput {
    email: String!
    password: String
  }
`
