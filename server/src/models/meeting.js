const mongoose = require('mongoose');

const Meeting = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Meeting', Meeting);
