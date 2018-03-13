const Chirp = require('../models/Chirp')
const User = require('../models/User')

module.exports = {
  async create (req, res) {
    console.log('req HEADERS!!!', req.headers)
    try {
      console.log('IN THAT MAGIC REQ YOU FIND',req.body)
      let chirp = new Chirp({
        chirpContent: req.body.text,
        creator: req.user._id
      })

      chirp.save((err, chirp) => {
        console.log('cannot create chirp since', err)
        console.log('the actual chirp', chirp)
        if (err) {
          res.status(400).send({
            error: 'Error creating chirp, please try again'
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Could not create chirp'
      })
      return err
    }
  },
  async index (req, res) {
    try {
      await Chirp.find({})
        .sort({'createdAt':'desc'})
        .populate({path:'creator', model: User})
        .exec((err, chirps) => {
          if (err) {
            return err
          }
          res.json(chirps)
        })
    } catch (err) {
      console.log(err)
    }
  } 
}
