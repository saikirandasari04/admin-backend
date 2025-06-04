const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  role: {
    type : String,
    required : true,
    default : 'Admin'
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

module.exports = mongoose.model('Admin', adminSchema);
