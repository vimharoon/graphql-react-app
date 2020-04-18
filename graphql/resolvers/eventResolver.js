const Event = require('../../models/event')
const User = require('../../models/user')

const { dateToString } = require('../../helpers/date')
const { user } = require('../../helpers/resolversUtils')

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
      date: dateToString(result._doc.date),
      creator: user.bind(this, result._doc.creator),
    }

    const creator = await User.findById('5e9a030955ad7d77514574c0')
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
