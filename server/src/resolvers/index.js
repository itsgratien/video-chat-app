const user = require('./user');

const meeting = require('./meeting');

module.exports = {
  Query: {
    ...user.userQuery,
    ...meeting.meetingQuery,
  },
  Mutation: {
    ...user.userMutation,
    ...meeting.meetingMutation,
  },
};
