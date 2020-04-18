const Event = require('../models/event')
const User = require('../models/user')

const { dateToString } = require('./date')

const user = async (userId) => {
  try {
    const user = await User.findById(userId)

    return {
      ...user._doc,
      createdEvent: event.bind(this, user._doc.createdEvent),
    }
  } catch (error) {
    throw error
  }
}

const event = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })

    return events.map((event) => {
      return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator),
      }
    })
  } catch (error) {
    throw error
  }
}

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId)
    return { ...event._doc, creator: user.bind(this, event.creator) }
  } catch (error) {
    throw error
  }
}

module.exports = {
  user,
  event,
  singleEvent,
}
