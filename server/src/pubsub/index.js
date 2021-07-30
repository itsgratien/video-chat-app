const { PubSub } = require('graphql-subscriptions');

exports.pubSub = new PubSub();

exports.pubSubEvent = {
  meetingCreated: 'MEETING_CREATED',

  loggedInUser: 'GET_LOGGED_IN_USER',
};
