const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function simplifyUser(request) {
  return {
    _id: request._id,
    username: request.username,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    avatar: request.avatar,
    coverImage: request.coverImage
  };
}

function jwtSignUser (user) {
  const ONE_DAY = 60 * 60 * 24
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY
  })
}

module.exports = {
  async register (req, res) {
    try {
      User.findOne({$or: [
        {"email": req.body.email},
        {"username": req.body.username}
      ]}, (err, user) => {
        if (user) {
          res.status(400).send({
            error: 'The email account or username is already in use.'
          })
        } else {
          let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstname,
            lastName: req.body.lastname
          })
          user.save((err, user) => {
            if (err) {
              res.status(400).send({
                error: 'Error creating that user, please try again'
              })
            }
            let plainUser = simplifyUser(user)
            res.status(201).send({
              user: plainUser,
              token: jwtSignUser(plainUser)
            })
          })
        }
      })
    } catch (err) {
      res.status(400).send({
        error: 'Could not register user'
      })
      return err
    }
  },
  login (req, res) {
    try {
      const {email, password} = req.body
      const user = User.findOne({"email": email}, (err, user) => {
        if (err || !user) {
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        }
        const isPassValid = user.comparePassword(password)
        if (!isPassValid) {
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        }
        const plainUser = simplifyUser(user)
        res.send({
          user: plainUser,
          token: jwtSignUser(plainUser)
        })
      })
    } catch (err) {
      res.status(500).send({
        error: `There was an internal server error, we couldn't log you in`
      })
    }
  }
}
