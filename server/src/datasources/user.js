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
}

module.exports = new UserDataSource();
