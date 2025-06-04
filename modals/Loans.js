const mongoose = require('mongoose');
const { Schema } = mongoose;

const loanSchema = new Schema({
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  purpose: {
    type: String,
    required: true,
    trim: true
  },
  income: {
    type: Number,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true
  }
},{timtimestamps: true});

module.exports = mongoose.model('Loan', loanSchema);
