const { ApolloServer } = require('apollo-server-express');

const http = require('http');

const express = require('express');

const { SubscriptionServer } = require('subscriptions-transport-ws');

const { makeExecutableSchema } = require('@graphql-tools/schema');

const { execute, subscribe } = require('graphql');

const { config } = require('dotenv');

const typeDefs = require('./src/schema');

const { database } = require('./src/config');

const resolvers = require('./src/resolvers');

const dataSources = require('./src/datasources');

config();

(async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
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

  await server.start();

  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    database();

    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
})();
