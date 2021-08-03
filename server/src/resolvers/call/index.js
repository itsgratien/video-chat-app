const { isAuth } = require('../user');

const callMutation = require('./mutation');

const callSubscription = require('./subscription');

module.exports = {
  callMutation: {
    ...callMutation,
    makeCall: isAuth(callMutation.makeCall),
    acceptCall: isAuth(callMutation.acceptCall),
    rejectCall: isAuth(callMutation.rejectCall),
  },
  callSubscription,
};
