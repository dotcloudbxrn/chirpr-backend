const port = process.env.PORT || 4040
const env = process.env.NODE_ENV || 'development'
const settings = require('./config/settings')[env]
const app = require('./config/express')
const cors = require('cors')

app.use(cors())

require('./config/db')(settings)
require('./routes')(app)

app.listen(port)
console.log(`Listening on port ${port}`)
