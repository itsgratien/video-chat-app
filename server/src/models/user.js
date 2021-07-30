const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  lastSeen: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('User', User);
