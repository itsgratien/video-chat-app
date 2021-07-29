const { ApolloError } = require('apollo-server-express');

class UserQuery {
  getProfile = async (_, __, context) => {
    try {
      const { dataSources, user } = context;

      const find = await dataSources.userAPI.getProfile(user._id);

      if (!find) {
        return null;
      }

      return find;
    } catch (error) {
      throw new ApolloError(
        'Unable to fetch data due to an internal server error'
      );
    }
  };
}

exports.userQuery = new UserQuery();
