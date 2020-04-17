const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// import models
const Event = require('./models/event')
const User = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String
    }

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
    }
  `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((result) => {
            return result.map((event) => {
              return { ...event._doc }
            })
          })
          .catch((error) => {
            console.log(error)
          })
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: '5e9a030955ad7d77514574c0',
        })
        let createdEvent = null
        return event
          .save()
          .then((result) => {
            createdEvent = { ...result._doc }
            return User.findById('5e9a030955ad7d77514574c0')
          })
          .then((user) => {
            user.createdEvent.push(event)
            return user.save()
          })
          .then((result) => {
            return createdEvent
          })
          .catch((error) => {
            console.log(error)
            throw error
          })
      },
      createUser: (args) => {
        return User.findOne({ email: args.userInput.email })
          .then((user) => {
            if (user) {
              throw new Error('user with this email exist already')
            }
            return bcrypt.hash(args.userInput.password, 12)
          })
          .then((hasedPassword) => {
            const user = new User({
              email: args.userInput.email,
              password: hasedPassword,
            })
            return user.save()
          })
          .then((result) => {
            return { ...result._doc, password: null }
          })
          .catch((error) => {
            console.log(error)
            throw error
          })
      },
    },
    graphiql: true,
  })
)

mongoose
  .connect('mongodb://localhost:27017/events-booking-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8080)
  })
  .catch((error) => {
    console.log(error)
  })
