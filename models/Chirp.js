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
  ref: 'user'
},
comments: {
  type: Array,
  ref: 'comments'
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Chirp', ChirpSchema)