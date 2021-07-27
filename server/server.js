const { ApolloServer } = require('apollo-server');

const { config } = require('dotenv');

const typeDefs = require('./src/schema');

const { database } = require('./src/config');

const resolvers = require('./src/resolvers');

const dataSources = require('./src/datasources');

config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: dataSources.userDataSource,
    meetingAPI: dataSources.meetingDataSource,
  }),
  context: async ({ req }) => {
    const auth = req.headers && req.headers.authorization;

    if (!auth) return { user: null };

    const userId = Buffer.from(auth, 'base64').toString('ascii');

    const find = await dataSources.userDataSource.getProfile(userId);

    if (!find) return { user: null };

    return {
      user: find,
    };
  },
});

server.listen().then((value) => {
  database();

  console.log(`Server is listening on ${value.url}`);
});
