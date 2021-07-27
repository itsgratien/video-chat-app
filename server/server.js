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
  }),
});

server.listen().then((value) => {
  database();

  console.log(`Server is listening on ${value.url}`);
});
