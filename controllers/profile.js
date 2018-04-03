const User = require('../models/User')

// returns true if the user is following
isFollowing = (id, following) => {
	return User.findOne({'_id': id}).exec().then(user => {
		return user.following.indexOf(following) > -1
	})
}

module.exports = {
	getUserInfo (req, res) {
		let username = req.params.username
		User.findOne({'username': username}, (err, user) => {
				if (!err) {
					let resUser = {
						_id: user._id,
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
	},
	async toggleFollow (req, res) {
		let user = User.findOne({'_id': req.body.id}, (err, user) => {
			if (user.following.indexOf(req.body.following) != -1) {
				user.following.pop(req.body.following)
				user.save((err, user) => {
					if (err) {
						console.log('err removing follower', err)
					}
					res.json({following: false})
				})
			} else {
				user.following.push(req.body.following)
				user.save((err, user) => {
					if (err) {
						console.log('err adding follower', err)
					}
					res.json({following: true})
				})
			}
		})
	},
	async checkFollowingStatus (req, res) {
		let userId = req.body.id
		let isFollowingUsername = req.body.following
		let result = await isFollowing(userId, isFollowingUsername)
		res.json({following: result})
	}
}
