const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

// import models
const Event = require('./models/event')

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

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
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
        })
        return event
          .save()
          .then((result) => {
            return { ...result._doc }
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
