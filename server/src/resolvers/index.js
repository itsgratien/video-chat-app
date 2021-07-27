const user = require('./user');

module.exports = {
  Query: {
    ...user.userQuery,
  },
  Mutation: {
    ...user.userMutation,
  },
};
