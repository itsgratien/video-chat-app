const { ApolloError } = require('apollo-server');

class MeetingMutation {
  addMeeting = async (_, args, context) => {
    try {
      const { user, dataSources } = context;

      const add = await dataSources.meetingAPI.addMeeting(user._id, args);

      return add;
    } catch (error) {
      throw new ApolloError(
        'Unable to add meeting due to internal server error'
      );
    }
  };
}

module.exports = new MeetingMutation();
