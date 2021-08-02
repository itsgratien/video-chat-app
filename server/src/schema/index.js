const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  interface UserType {
    _id: ID!
    email: String!
    lastSeen: String
  }

  type User {
    _id: ID!
    email: String!
    lastSeen: String
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

  type Call {
    _id: ID!
    status: String!
    senderId: ID!
    receiverId: ID!
    updatedAt: String!
    createdAt: String!
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
    meetingId: ID!
  }

  type MakeCallResponse {
    user: User!
    call: Call!
  }

  type GetWhoIsCallingResponse {
    _id: ID!
    status: String!
    senderId: User!
    receiverId: ID!
    updatedAt: String!
    createdAt: String!
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
    updateLastSeen: User!
    makeCall(receiverId: ID!): MakeCallResponse!
    acceptCall(sender: ID!): Call!
  }

  type Subscription {
    getCreatedMeeting: Meeting!
    getOnlineUsers: [User!]!
    getWhoIsCalling: GetWhoIsCallingResponse!
  }
`;

module.exports = typeDefs;
