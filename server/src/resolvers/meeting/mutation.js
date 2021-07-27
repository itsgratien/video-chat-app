const { ApolloError, UserInputError } = require('apollo-server');

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

  deleteMeeting = async (_, args, context) => {
    try {
      const { user, dataSources } = context;

      const find = await dataSources.meetingAPI.getMeeting(args.id);

      if(find.error){
        return new UserInputError(find.error);
      }

      const res = await dataSources.meetingAPI.deleteMeeting(user._id, args.id);

      console.log('res', res);

      return res;
    } catch (error) {
      console.log('error', error);
      throw new ApolloError(
        'Unable to delete meeting due to internal server error'
      );
    }
  };
}

module.exports = new MeetingMutation();
