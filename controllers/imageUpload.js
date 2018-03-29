const imgur = require('imgur-node-api')

module.exports = {
	upload (req,res) {
		imgur.setClientID('020ba7048ca6f32');
		imgur.upload('http://78.media.tumblr.com/tumblr_md1yfw1Dcz1rsx19no1_1280.png', (err, res) => {
			if(err) {
				console.log('eh2', err)
			}
			console.log('imgur', res.data)
			console.log('imgur', res.data.link)
		})
		res.json({'hm':'hi'})
	}
}