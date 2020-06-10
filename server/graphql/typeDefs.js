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

  input getUserInput {
    id: ID
    userName: String
    email: String
    createdAt: String
  }

  input getMessageInput {
    id: ID
    message: String
    author: ID
    recipient: ID
    chatRoom: ID
    createdAt: String
  }

  input getChatRoomInput {
    id: ID
    topic: String
    admin: ID
    createdAt: String
  }

  input addUserInput {
    userName: String!
    email: String!
    password: String!
  }

  input addMessageInput {
    message: String!
    author: ID!
    recipient: ID
    chatRoom: ID
  }

  input addChatRoomInput {
    message: String!
    topic: String!
    admin: ID!
  }

  type Query {
    user(input: getUserInput!): User
    users(input: getUserInput): [User]!
    message(input: getMessageInput!): Message
    messages(input: getMessageInput): [Message]!
    chatRoom(input: getChatRoomInput!): ChatRoom
    chatRooms(input: getChatRoomInput): [ChatRoom]!
  }

  type Mutation {
    addUser(input: addUserInput!): User!
    addMessage(input: addMessageInput!): Message!
    addChatRoom(input: addChatRoomInput!): ChatRoom!
  }
`;
