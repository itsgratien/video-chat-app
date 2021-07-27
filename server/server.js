const { ApolloServer, gql } = require('apollo-server');

const { config } = require('dotenv');

config();

const typeDefs = gql``;

const server = new ApolloServer({ typeDefs });

server
  .listen()
  .then((value) => console.log(`Server is listening on ${value.url}`));
