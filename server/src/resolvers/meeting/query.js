const { ApolloError, UserInputError } = require('apollo-server-express');

class MeetingQuery {
  getMeeting = async (_, args, context) => {
    try {
      const { dataSources } = context;

      const add = await dataSources.meetingAPI.getMeeting(args.id);

      if (add.error) {
        return new UserInputError(add.error);
      }

      return add.data;
    } catch (error) {
      throw new ApolloError(
        'Unable to fetch meeting due to internal server error'
      );
    }
  };

  getMeetings = async (_, __, context) => {
    try {
      const { dataSources, user } = context;

      const add = await dataSources.meetingAPI.getMeetings(user._id);

      return add;
    } catch (error) {
      throw new ApolloError(
        'Unable to fetch meetings due to internal server error'
      );
    }
  };
}

module.exports = new MeetingQuery();
