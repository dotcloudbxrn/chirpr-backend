const port = process.env.PORT || 4040
const env = process.env.NODE_ENV || 'development'
const settings = require('./config/config')[env]
const app = require('./config/express')
const morgan = require('morgan')
const server = require('http').Server(app)
const io = require('socket.io')(server);

require('./config/passport')
require('./config/db')(settings)

server.listen(port)
console.log(`Listening on port ${port}`)
