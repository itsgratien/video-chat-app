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
  }
};
