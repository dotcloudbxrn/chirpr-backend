const path = require('path')

module.exports =  {
	development: {
		rootDir: path.normalize(__dirname, '../../'),
		dbPath: 'mongodb://localhost:27017/Chirpr',
		clientUrl: 'http://localhost:8080'
	},
	production: {
		rootDir: path.normalize(__dirname,'../../'),
		dbPath: process.env.MONGODB_URI,
	},
	authentication: {
		jwtSecret: process.env.JWT_SECRET || 'This is a secret!',
		jwtSession: {
			session: false
		}
	}
}
