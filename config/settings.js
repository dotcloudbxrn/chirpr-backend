const path = require('path')

module.exports =  {
	development: {
		rootDir: path.normalize(__dirname, '../../'),
		dbPath: 'mongodb://localhost:27017/Twitter'
	},
	production: {
		rootDir: path.normalize(__dirname,'../../'),
		dbPath: process.env.MONGODB_URI
	}
}