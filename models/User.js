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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: 'Default Bio'
  },
  avatar: {
    type: String,
    default : 'http://cdn1.vox-cdn.com/assets/4830632/untitled-1.jpg'
    
  },
  coverImage: {
    type: String,
    default: 'https://www.rpgfix.com/styles/brivium/ProfileCover/default.jpg'
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


