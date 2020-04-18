const { buildSchema } = require('graphql')

// import schemas
const userSchema = require('./userSchema')
const eventSchema = require('./eventSchema')

module.exports = buildSchema(`
  ${eventSchema}

  ${userSchema}

  type RootQuery {
    events: [Event!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`)
