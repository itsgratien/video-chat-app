const { PubSub } = require('graphql-subscriptions');

exports.pubSub = new PubSub();

exports.pubSubEvent = {
  meetingCreated: 'MEETING_CREATED',

  getOnlineUsers: 'GET_ONLINE_USERS',
};
