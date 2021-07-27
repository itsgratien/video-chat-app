const { ApolloError, ValidationError } = require('apollo-server');

const { validate } = require('isemail');

class UserMutation {
  login = async (__, args, { dataSources }) => {
    try {
      if (!validate(args.email)) {
        return new ValidationError('email must be valid');
      }

      const find = await dataSources.userAPI.login(args.email);

      return {
        data: find,
        token: Buffer.from(String(find._id)).toString('base64'),
      };
    } catch (error) {
      throw new ApolloError('Unable to login due to internal server error');
    }
  };
}

exports.userMutation = new UserMutation();
