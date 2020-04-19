const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

// import graphQl schema and resolvers
const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')

// import auth middleware
const isAuth = require('./middleware/checkAuth')

const app = express()

app.use(bodyParser.json())

app.use(isAuth)

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
)

// to run mongod on mac: mongod --dbpath /System/Volumes/Data/data/db
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
