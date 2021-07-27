const meetingMutation = require('./mutation');

const { isAuth } = require('../user');

module.exports = {
  meetingMutation: {
    ...meetingMutation,
    addMeeting: isAuth(meetingMutation.addMeeting),
  },
};
