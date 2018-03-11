const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const ChirpSchema = new Schema({
  chirpContent: {
    type: String,
    required: true
  },
  creator: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }
})

module.exports = mongoose.model('Chirp', ChirpSchema)
