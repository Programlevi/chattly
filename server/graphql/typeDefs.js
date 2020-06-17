const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    photo: String!
    createdAt: String!
  }

  type Message {
    id: ID!
    message: String!
    author: User!
    createdAt: String!
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
  }

  type Query {
    user(input: FilterUserInput!): User
    users(input: FilterUserInput): [User]!
    message(input: FilterMessageInput!): Message
    messages(input: FilterMessageInput): [Message]!
  }

  type Mutation {
    addUser(input: AddUserInput!): User!
    addMessage(input: AddMessageInput!): Message!
  }
`;
