// import resolvers
const { login, createUser } = require('./userResolver')
const { events, createEvent } = require('./eventResolver')
const { bookings, bookingEvent, cancelBooking } = require('./bookingResolver')

module.exports = {
  login: login,
  events: events,
  bookings: bookings,
  createEvent: createEvent,
  createUser: createUser,
  bookingEvent: bookingEvent,
  cancelBooking: cancelBooking,
}
