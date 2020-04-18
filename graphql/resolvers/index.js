// import resolvers
const { createUser } = require('./userResolver')
const { events, createEvent } = require('./eventResolver')

module.exports = {
  events: events,
  createEvent: createEvent,
  createUser: createUser,
}
