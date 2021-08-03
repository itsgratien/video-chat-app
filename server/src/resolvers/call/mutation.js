const { UserInputError } = require('apollo-server-express');

const { pubSub, pubSubEvent } = require('../../pubsub');

const { callStatus } = require('../../models/call');

class CallMutation {
  makeCall = async (_, args, context) => {
    try {
      const { receiverId } = args;

      const { dataSources, user } = context;

      const checkUser = await dataSources.userAPI.getProfile(receiverId);

      if (!checkUser) {
        return UserInputError('user you are calling could not be found');
      }

      const add = await dataSources.callAPI.makeCall(user._id, receiverId);

      pubSub.publish(pubSubEvent.getRequestedCall, {
        getWhoIsCalling: {
          senderId: user._id,
        },
      });

      return {
        call: add,
        user: checkUser,
      };
    } catch (error) {
      throw new ApolloError(
        'Unable to make a call due to internal server error'
      );
    }
  };
  acceptCall = async () => {};
  rejectCall = async (_, args, context) => {
    try {
      const { callId } = args;

      const { dataSources, user } = context;

      const change = await dataSources.callAPI.updateCallStatus(
        callId,
        user._id,
        callStatus.Rejected
      );

      pubSub.publish(pubSubEvent.rejectCall, { getRejectedCall: change });

      return {
        message: 'Call rejected',
      };
    } catch (error) {
      throw new ApolloError(
        'Unable to reject call due to internal server error'
      );
    }
  };
}

module.exports = new CallMutation();
