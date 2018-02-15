const mongoose = require('mongoose')

module.exports = (settings) => {
	mongoose.connect(settings.dbPath)

	let db = mongoose.connection

	db.once('open', (err) => {
		if (err) {
			throw err
		}
		db.collections['users'].drop((err) => {
			if (err) { return err }
			console.log('Dropped')
		})
		console.log('Connected to MongoDB')
	})

	db.on('error', (err) => {
		throw err
	})
}
