const { ApolloError, AuthenticationError } = require('apollo-server');

class UserQuery {
  getProfile = async (_, __, context) => {
    try {
      const { dataSources, user } = context;

      if (!user) {
        return new AuthenticationError('Unauthorized access');
      }

      const find = await dataSources.userAPI.getProfile(user._id);

      if (!find) {
        return null;
      }

      return find;
    } catch (error) {
      console.log('error', error);
      throw new ApolloError(
        'Unable to fetch data due to an internal server error'
      );
    }
  };
}

exports.userQuery = new UserQuery();
