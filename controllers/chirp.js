const Chirp = require('../models/Chirp')
const User = require('../models/User')

module.exports = {
  async create (req, res) {
    try {
      let chirp = new Chirp({
        chirpContent: req.body.chirpContent,
        creator: req.user._id
      })

      chirp.save((err, chirp) => {
        if (err) {
          res.status(400).send({
            error: 'Error creating chirp, please try again'
          })
        }
        res.status(201).send({
          chirp
        })
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
