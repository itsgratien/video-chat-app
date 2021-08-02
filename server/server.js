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
const { manageAuthorization } = require('./src/datasources/user');

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
      callAPI: dataSources.callDataSource,
    }),
    context: async ({ req }) => {
      const token = req.headers && req.headers.authorization;

      const manageAuth = await dataSources.userDataSource.manageAuthorization(
        token
      );

      return manageAuth;
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema,
      onConnect: async (connectionParams) => {
        const token = connectionParams.authorization;

        const manageAuth = await dataSources.userDataSource.manageAuthorization(
          token
        );

        return manageAuth;
      },
    },
    { server: httpServer, path: server.graphqlPath }
  );

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    database();

    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
})();
