const { ApolloError, UserInputError } = require('apollo-server-express');

const { PubSub } = require('graphql-subscriptions');

const event = require('../../event');

const pubSub = new PubSub();

class MeetingMutation {
  addMeeting = async (_, args, context) => {
    try {
      const { user, dataSources } = context;

      const add = await dataSources.meetingAPI.addMeeting(user._id, args);

      pubSub.publish(event.meetingCreated, { meetingCreated: add });

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

      if (find.error) {
        return new UserInputError(find.error);
      }

      const res = await dataSources.meetingAPI.deleteMeeting(user._id, args.id);

      return res;
    } catch (error) {
      throw new ApolloError(
        'Unable to delete meeting due to internal server error'
      );
    }
  };

  startMeeting = async (_, args, context) => {
    try {
      const { dataSources } = context;

      const find = await dataSources.meetingAPI.getMeeting(args.id);

      if (find.error) {
        return new UserInputError(find.error);
      }

      if (Number(find.data.passCode) !== Number(args.passCode)) {
        return new UserInputError('Unable to start meeting');
      }

      return find.data;
    } catch (error) {
      throw new ApolloError(
        'Unable to delete meeting due to internal server error'
      );
    }
  };
}

module.exports = new MeetingMutation();
