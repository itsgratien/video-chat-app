const { callDataSource: callAPI } = require('../../datasources');

const { pubSub, pubSubEvent } = require('../../pubsub');

module.exports = {
  getWhoIsCalling: {
    resolve: async (payload, args, context) => {
      const getCall = await callAPI.getWhoIsCalling(
        payload.getWhoIsCalling.senderId,
        context.user._id
      );

      return (payload.getWhoIsCalling = getCall);
    },
    subscribe: () => pubSub.asyncIterator([pubSubEvent.getRequestedCall]),
  },
  getRejectedCall: {
    resolve: async (payload, args, context) => {
      const { _id } = payload.getRejectedCall;

      const { user } = context;

      const find = await callAPI.getCall({
        $and: [{ _id }, { senderId: user._id }],
      });

      return (payload.getRejectedCall = find);
    },
    subscribe: () => pubSub.asyncIterator([pubSubEvent.rejectCall]),
  },
};
