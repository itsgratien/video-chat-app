const { userModel } = require('../models');

class UserDataSource {
  getProfile = async (id) => {
    const find = await userModel.findById(id);

    return {
      _id: find._id,
      email: find.email,
    };
  };

  login = async (email) => {
    const find = await userModel.findOneAndUpdate(
      { email },
      { email },
      { upsert: true, new: true }
    );

    return {
      _id: find._id,
      email: find.email,
    };
  };

  updateLastSeen = async (userId, arg) => {
    const update = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { lastSeen: arg } },
      { new: true }
    );

    return update;
  };

  getOnlineUsers = async (loggedInUserId, lastSeen) => {
    const find = await userModel.find({
      $and: [{ _id: { $ne: loggedInUserId } }],
    });

    return find;
  };
}

module.exports = new UserDataSource();
