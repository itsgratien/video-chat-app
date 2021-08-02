const { pubSub, pubSubEvent } = require('../../pubsub');

const {
  userDataSource: userAPI,
  callDataSource: callAPI,
} = require('../../datasources');

module.exports = {
  getOnlineUsers: {
    resolve: async (payload, args, context) => {
      const { user } = context;

      const find = await userAPI.getOnlineUsers(
        user._id,
        payload.getOnlineUsers.lastSeen
      );

      return (payload.getOnlineUsers = find);
    },
    subscribe: () => pubSub.asyncIterator([pubSubEvent.getOnlineUsers]),
  },
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
};
