const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const port = process.env.PORT || settings.webPort

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