const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      firstname: Joi.string(),
      lastname: Joi.string(),
      role: Joi.string()
    }

    const {error} = Joi.validate(req.body, schema)
    if (error) {
      console.log(error)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following criteria:
            <br>
            1. It must contain only lower case, upper case and numerics
            <br>
            2. It must be at least 8 characters in length and not greater than 32 characters`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
