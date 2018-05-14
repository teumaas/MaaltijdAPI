const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authentication.routes')
// const List = require('./model/List')
const AuthController = require('./controllers/authentication.controller')
const statusRoutes = require('./routes/status.routes')

const ApiError = require('./model/ApiError')
const config = require('./config/config');
const db = require('./config/db');

const port = process.env.PORT || 3000

let app = express()

// bodyParser parses the body from a request
app.use(bodyParser.json())

// Instal Morgan as logger
app.use(morgan('dev'))

// Start listening for incoming requests.
app.listen(port, () => {
	console.log('Server running on port ' + port)
})

// Testcases need our app - export it.
module.exports = app