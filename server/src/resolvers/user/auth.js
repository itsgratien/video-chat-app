const { AuthenticationError } = require('apollo-server-express');

exports.isAuth = (next) => (root, args, context) => {
  if (!context.user) {
    throw new AuthenticationError('Unauthorized access');
  }

  return next(root, args, context);
};

