const { ApolloServer } = require('apollo-server');

const { config } = require('dotenv');

const typeDefs = require('./src/schema');

const { database } = require('./src/config');

config();

const server = new ApolloServer({ typeDefs });

server.listen().then((value) => {
  database();

  console.log(`Server is listening on ${value.url}`);
});
