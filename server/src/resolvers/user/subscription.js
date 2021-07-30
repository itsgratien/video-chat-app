const { pubSub, pubSubEvent } = require('../../pubsub');

module.exports = {
  getOnlineUsers: {
    subscribe: () => pubSub.asyncIterator([pubSubEvent.getOnlineUsers]),
  },
};
