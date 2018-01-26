const port = process.env.PORT || 4040
const env = process.env.NODE_ENV || 'development'
const settings = require('./config/settings')[env]
const app = require('./config/express')

require('./config/db')(settings)
require('./config/routes')(app)
app.listen(port)
console.log(`Listening on port ${port}`)
