const { ApolloError, UserInputError } = require('apollo-server');

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
        'Unable to add meeting due to internal server error'
      );
    }
  };
}

module.exports = new MeetingQuery();
