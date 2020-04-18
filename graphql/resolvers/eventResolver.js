const Event = require('../../models/event')
const User = require('../../models/user')

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
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator),
      }
    })
  } catch (error) {
    throw error
  }
}

const events = async () => {
  try {
    const events = await Event.find()
    return events.map((event) => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator),
      }
    })
  } catch (error) {
    throw error
  }
}

const createEvent = async (args) => {
  const event = new Event({
    title: args.eventInput.title,
    description: args.eventInput.description,
    price: +args.eventInput.price,
    date: new Date(args.eventInput.date),
    creator: '5e9a030955ad7d77514574c0',
  })

  try {
    const result = await event.save()
    let createdEvent = {
      ...result._doc,
      date: new Date(result._doc.date).toISOString(),
      creator: user.bind(this, result._doc.creator),
    }

    const user = await User.findById('5e9a030955ad7d77514574c0')
    user.createdEvent.push(event)
    await user.save()
    return createdEvent
  } catch (error) {
    throw error
  }
}
module.exports = {
  events,
  createEvent,
}
