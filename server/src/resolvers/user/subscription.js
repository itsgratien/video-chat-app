const { pubSub, pubSubEvent } = require('../../pubsub');

module.exports = {
  getLoggedInUser: {
    subscribe: () => pubSub.asyncIterator([pubSubEvent.loggedInUser]),
  },
};
