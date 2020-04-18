const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

// import graphQl schema and resolvers
const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')

const app = express()

app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
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
