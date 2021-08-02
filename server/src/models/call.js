const mongoose = require('mongoose');

const callStatus = {
  Rejected: 'Rejected',

  Accepted: 'Accepted',

  Waiting: 'Waiting',
};

const CallSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  model: mongoose.model('Call', CallSchema),
  callStatus,
};
