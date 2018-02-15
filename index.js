const port = process.env.PORT || 4040
const env = process.env.NODE_ENV || 'development'
const settings = require('./config/config')[env]
const app = require('./config/express')
const morgan = require('morgan')

require('./config/passport')
require('./config/db')(settings)

app.listen(port)
console.log(`Listening on port ${port}`)
