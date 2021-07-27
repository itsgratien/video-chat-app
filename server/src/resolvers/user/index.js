const { userMutation } = require('./mutation');

const { userQuery } = require('./query');

const { isAuth } = require('./auth');

module.exports = {
  userMutation,
  userQuery: {
    ...userQuery,
    getProfile: isAuth(userQuery.getProfile),
  },
  isAuth,
};
