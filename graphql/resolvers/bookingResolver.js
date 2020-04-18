const Booking = require('../../models/booking')
const Event = require('../../models/event')

const { user, singleEvent } = require('../../helpers/resolversUtils')
const { dateToString } = require('../../helpers/date')

const bookings = async () => {
  try {
    const bookings = await Booking.find()
    return bookings.map((booking) => {
      return {
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
      }
    })
  } catch (error) {
    throw error
  }
}

const bookingEvent = async (args) => {
  try {
    const getEventById = await Event.findOne({ _id: args.eventId })
    const booking = new Booking({
      user: '5e9a030955ad7d77514574c0',
      event: getEventById,
    })
    const result = await booking.save()
    return {
      ...result._doc,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: dateToString(booking._doc.createdAt),
      updatedAt: dateToString(booking._doc.updatedAt),
    }
  } catch (error) {
    throw error
  }
}

const cancelBooking = async (args) => {
  try {
    const booking = await Booking.findById(args.bookingId).populate('event')
    const event = {
      ...booking.event._doc,
      creator: user.bind(this, booking.event._doc.creator),
    }
    await Booking.deleteOne({ _id: args.bookingId })
    return event
  } catch (error) {
    throw error
  }
}

module.exports = {
  bookings,
  bookingEvent,
  cancelBooking,
}
