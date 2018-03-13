const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function simplifyUser(request) {
  return {
    _id: request._id,
    username: request.username,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role,
  };
}

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
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
            "profile.firstName": req.body.firstname,
            "profile.lastName": req.body.lastname
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
