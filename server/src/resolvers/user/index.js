const { userMutation } = require('./mutation');

const { userQuery } = require('./query');

const { isAuth } = require('./auth');

const userSubscription = require('./subscription');

module.exports = {
  userMutation,
  userQuery: {
    ...userQuery,
    getProfile: isAuth(userQuery.getProfile),
  },
  isAuth,
  userSubscription
};
