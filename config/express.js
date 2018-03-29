const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
let ENV = process.env.ENV || 'development'

let corsOptions = {
	// origin: config[ENV].clientUrl,
	origin: true,
	credentials: true
}

app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./routes')(app)

module.exports = app
