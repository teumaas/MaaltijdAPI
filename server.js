const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const AuthRoutes = require('./routes/authentication.routes')
const HouseRoutes = require('./routes/house.routes')
//const List = require('./model/List')
const AuthController = require('./controllers/authentication.controller')
const StatusRoutes = require('./routes/status.routes')

const ApiError = require('./model/ApiError')
const config = require('./config/config');
const db = require('./config/db');

const port = process.env.PORT || 3000

let app = express()

app.use(bodyParser.json())

// Instal Morgan as logger
app.use(morgan('dev'))

// Preprocessing catch-all endpoint
// The perfect place to check that the user performing the request 
// has authorisation to do things on our server
app.use('*', function(req, res, next){
	next()
})

// Unprotected routes - no token required.
// Provides login and registration 
app.use('/api', AuthRoutes)

// On all other routes, check for API key
// app.all('*', (req, res, next) => { });
//app.all('*', AuthController.validateToken);

// Regular endpoints
app.use('/api', StatusRoutes)

app.use('/api', HouseRoutes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
	// console.log('Non-existing endpoint')
	const error = new ApiError("Deze endpoint bestaat niet", 404)
	next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	// console.dir(err)
	res.status((err.code || 404)).json(err).end()	
})

// Start listening for incoming requests.
app.listen(port, () => {
	console.log('Server running on port ' + port)
})

// Testcases need our app - export it.
module.exports = app