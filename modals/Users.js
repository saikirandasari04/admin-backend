const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  role: {
    type : String,
    required : true,
    default : 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
},{timtimestamps: true});

module.exports = mongoose.model('User', userSchema);
