const mongoose = require('mongoose');

const Meeting = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    meetingLink: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Meeting', Meeting);
