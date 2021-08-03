const user = require('./user');

const meeting = require('./meeting');

const call = require('./call');

module.exports = {
  Query: {
    ...user.userQuery,
    ...meeting.meetingQuery,
  },
  Mutation: {
    ...user.userMutation,
    ...meeting.meetingMutation,
    ...call.callMutation,
  },
  Subscription: {
    ...user.userSubscription,
    ...meeting.meetingSubscription,
    ...call.callSubscription,
  },
};
