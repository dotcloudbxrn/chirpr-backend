const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  role: {
    type: String,
    enum: ['Member', 'Admin'],
    default: 'Member'
  }
},{
  timestamps: true
})

UserSchema.pre('save', function(next) {
  const user = this,
  SALT_FACTOR = 5;

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})


UserSchema.methods.comparePassword = function(passedPassword) {
  return bcrypt.compareSync(passedPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
