const User = require('../models/User')

module.exports = {
	getUserInfo (req, res) {
		let username = req.params.username
		User.findOne({username: username}, (err, user) => {
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
		User.findOne({'username': username}, (err, user) => {
			if (err) console.log(err)
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
	}
}
