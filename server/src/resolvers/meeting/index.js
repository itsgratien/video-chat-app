const meetingMutation = require('./mutation');

const meetingQuery = require('./query');

const { isAuth } = require('../user');

module.exports = {
  meetingMutation: {
    ...meetingMutation,
    addMeeting: isAuth(meetingMutation.addMeeting),
  },
  meetingQuery: {
    ...meetingQuery,
    getMeeting: isAuth(meetingQuery.getMeeting),
  },
};
