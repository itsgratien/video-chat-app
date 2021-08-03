const { callModel } = require('../models');

const { callStatus } = require('../models/call');

class CallDataSource {
  makeCall = async (senderId, receiverId) => {
    const add = await callModel.create({
      senderId,
      receiverId,
      status: callStatus.Waiting,
    });

    return add;
  };

  getWhoIsCalling = async (senderId, receiverId) => {
    const find = await callModel
      .findOne({
        $and: [{ senderId }, { receiverId }],
      })
      .populate('senderId');

    return find;
  };

  updateCallStatus = async (callId, receiverId, status) => {
    const change = await callModel.findOneAndUpdate(
      { $and: [{ _id: callId }, { receiverId }] },
      { $set: { status } },
      { new: true }
    );

    return change;
  };

  getCall = async (options) => {
    const find = await callModel.findOne(options);

    return find;
  };
}

module.exports = new CallDataSource();
