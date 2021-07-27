const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
  }

  type Meeting {
    _id: ID
    name: String!
    videoLink: String!
    owner: String!
    createdAt: String
    updatedAt: String
  }

  type LoginResponse {
    data: User!
    token: String!
  }

  type AddMeetingResponse {
    data: Meeting!
    message: String
  }

  type DeleteMeetingResponse {
    message: String
  }

  type Query {
    meetings: [Meeting!]!
    meeting(id: ID!): Meeting!
    getProfile: User!
  }

  type Mutation {
    login(email: String!): LoginResponse!
  }
`;

module.exports = typeDefs;
