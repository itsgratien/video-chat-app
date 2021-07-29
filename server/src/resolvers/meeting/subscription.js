const { PubSub } = require('graphql-subscriptions');

const event = require('../../event');

const pubSub = new PubSub();

module.exports = {
  meetingCreated: {
    subscribe: () => pubSub.asyncIterator([event.meetingCreated]),
  },
};
