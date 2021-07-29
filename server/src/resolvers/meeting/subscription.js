const { pubSub, pubSubEvent } = require('../../pubsub');

module.exports = {
  getCreatedMeeting: {
    subscribe: () => pubSub.asyncIterator([pubSubEvent.meetingCreated]),
  },
};
