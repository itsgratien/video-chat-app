const user = require('./user');

const meeting = require('./meeting');

module.exports = {
  Query: {
    ...user.userQuery,
  },
  Mutation: {
    ...user.userMutation,
    ...meeting.meetingMutation,
  },
};
