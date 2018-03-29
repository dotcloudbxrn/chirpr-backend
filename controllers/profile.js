const User = require('../models/User')

module.exports = {
	getUserInfo (req, res) {
		console.log('user', req.params)
		let username = req.params.username
		console.log('getUserInfo', username)
		User.findOne({'username': username}, (err, user) => {
			console.log('found', user)
				if (!err) {
					let resUser = {
						firstName: user.firstName,
						lastName: user.lastName,
						username: user.username,
						bio: user.bio,
						avatar: user.avatar,
						coverImage: user.coverImage
					}
					res.json(resUser)
				} else {
					console.log('There was an error trying to fetch your user')
					console.log('err is', err)
				}
			})
	},
	editUserInfo (req, res) {
		let username = req.params.username
		let updates = req.body
		try {
			User.findOne({'username': username}, (err, user) => {
				if (err) console.log('err in us3r', err)
				for (prop in updates) {
					if (updates[prop] && user[prop] !== updates[prop]) {
						user[prop] = updates[prop]
					}
				}
				user.save().then(user => {
					if (!user) {
						console.log(err)
						res.status(500).send('Could not update user after applying updates.')
					}
					res.json(user)
				})
			})
		} catch (error) {
			console.log(error)
			res.status(404).send({
				msg: 'Cannot post chirp'
			})
		}
	}
}
