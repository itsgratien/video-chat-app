const { ApolloError, ValidationError } = require('apollo-server-express');

const { validate } = require('isemail');

const { pubSub, pubSubEvent } = require('../../pubsub');

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
      console.log('error', error);
      throw new ApolloError('Unable to login due to internal server error');
    }
  };

  updateLastSeen = async (_, args, { dataSources, user }) => {
    try {
      const lastSeen = Date.now();
      const update = await dataSources.userAPI.updateLastSeen(
        user._id,
        lastSeen
      );

      pubSub.publish(pubSubEvent.getOnlineUsers, { getOnlineUsers: update });

      return update;
    } catch (error) {
      throw new ApolloError(
        'Unable to perform action due to internal server error'
      );
    }
  };
}

exports.userMutation = new UserMutation();
