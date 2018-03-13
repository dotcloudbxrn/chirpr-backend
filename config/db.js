const mongoose = require('mongoose')

module.exports = (settings) => {
	mongoose.connect(settings.dbPath)

	let db = mongoose.connection

	db.once('open', (err) => {
		if (err) {
			throw err
		}
		db.dropDatabase()
		console.log('Connected to MongoDB')
	})

	db.on('error', (err) => {
		throw err
	})
}
