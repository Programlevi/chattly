const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    role: UserRoleEnum!
    photo: String!
    createdAt: String!
  }

  type ChatRoom {
    id: ID!
    topic: String!
    admin: User!
    messages: [Message]!
    memberCount: Int!
    createdAt: String!
  }

  type Message {
    id: ID!
    message: String!
    author: User!
    createdAt: String!
  }

  enum UserRoleEnum {
    user
    admin
  }

  input FilterUserInput {
    id: ID
    userName: String
    email: String
    createdAt: String
  }

  input FilterMessageInput {
    id: ID
    message: String
    author: ID
    recipient: ID
    chatRoom: ID
    createdAt: String
  }

  input FilterChatRoomInput {
    id: ID
    topic: String
    admin: ID
    createdAt: String
  }

  input AddUserInput {
    userName: String!
    email: String!
    password: String!
  }

  input AddMessageInput {
    message: String!
    author: ID!
    recipient: ID
    chatRoom: ID
  }

  input AddChatRoomInput {
    topic: String!
    admin: ID!
  }

  input JoinChatRoomInput {
    member: ID!
    chatRoom: ID!
  }

  input UpdateUserInput {
    userName: String
    email: String
  }

  type Query {
    user(input: FilterUserInput!): User
    users(input: FilterUserInput): [User]!
    message(input: FilterMessageInput!): Message
    messages(input: FilterMessageInput): [Message]!
    chatRoom(input: FilterChatRoomInput!): ChatRoom
    chatRooms(input: FilterChatRoomInput): [ChatRoom]!
  }

  type Mutation {
    addUser(input: AddUserInput!): User!
    addMessage(input: AddMessageInput!): Message!
    addChatRoom(input: AddChatRoomInput!): ChatRoom!
    joinChatRoom(input: JoinChatRoomInput!): String!
  }
`;
