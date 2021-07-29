const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
  }

  type Meeting {
    _id: ID
    name: String!
    meetingLink: String!
    owner: String!
    passCode: String!
    hasStarted: Boolean!
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
    message: String!
  }

  type Query {
    getMeetings: [Meeting!]!
    getMeeting(id: ID!): Meeting!
    getProfile: User!
  }

  type Mutation {
    login(email: String!): LoginResponse!
    addMeeting(name: String!): AddMeetingResponse!
    deleteMeeting(id: ID!): DeleteMeetingResponse!
    startMeeting(id: ID!, passCode: String!): Meeting!
  }

  type Subscription {
    meetingCreated: Meeting!
  }
`;

module.exports = typeDefs;
