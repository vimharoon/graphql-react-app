// import resolvers
const { createUser } = require('./userResolver')
const { events, createEvent } = require('./eventResolver')
const { bookings, bookingEvent, cancelBooking } = require('./bookingResolver')

module.exports = {
  events: events,
  bookings: bookings,
  createEvent: createEvent,
  createUser: createUser,
  bookingEvent: bookingEvent,
  cancelBooking: cancelBooking,
}
