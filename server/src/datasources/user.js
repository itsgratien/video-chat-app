const { userModel } = require('../models');

class UserDataSource {
  getProfile = async (id) => {
    const find = await userModel.findById(id);

    return {
      _id: find._id,
      email: find.email,
    };
  };
}

module.exports = new UserDataSource;
