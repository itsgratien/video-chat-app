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
}

module.exports = new CallDataSource();
