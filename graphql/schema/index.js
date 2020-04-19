const { buildSchema } = require('graphql')

// import schemas
const userSchema = require('./userSchema')
const eventSchema = require('./eventSchema')
const bookingSchema = require('./bookingSchema')

module.exports = buildSchema(`
  ${eventSchema}

  ${userSchema}

  ${bookingSchema}

  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): UserAuthData!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookingEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`)
