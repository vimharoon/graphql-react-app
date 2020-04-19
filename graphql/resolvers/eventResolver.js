const Event = require('../../models/event')
const User = require('../../models/user')

const { dateToString } = require('../../helpers/_dateHelper')
const { user } = require('../../helpers/_resolversHelper')

const events = async () => {
  try {
    const events = await Event.find()
    return events.map((event) => {
      return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event._doc.creator),
      }
    })
  } catch (error) {
    throw error
  }
}

const createEvent = async (args, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthorized')
  }
  const event = new Event({
    title: args.eventInput.title,
    description: args.eventInput.description,
    price: +args.eventInput.price,
    date: new Date(args.eventInput.date),
    creator: req.userId,
  })

  try {
    const result = await event.save()
    let createdEvent = {
      ...result._doc,
      date: dateToString(result._doc.date),
      creator: user.bind(this, result._doc.creator),
    }

    const creator = await User.findById(req.userId)
    creator.createdEvent.push(event)
    await creator.save()
    return createdEvent
  } catch (error) {
    throw error
  }
}
module.exports = {
  events,
  createEvent,
}
