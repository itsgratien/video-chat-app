const { sub } = require('date-fns');

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
    const d = sub(lastSeen, { seconds: 5 });

    const find = await userModel
      .find({
        $and: [{ _id: { $ne: loggedInUserId } }, { lastSeen: { $gte: d } }],
      })
      .sort({ lastSeen: -1 });

    return find;
  };

  manageAuthorization = async (token) => {
    if (!token) return { user: null };

    const userId = Buffer.from(token, 'base64').toString('ascii');

    const find = await this.getProfile(userId);

    if (!find) return { user: null };

    return {
      user: find,
    };
  };
}

module.exports = new UserDataSource();
