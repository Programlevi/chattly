const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
    photo: String!
    createdAt: String!
  }

  type UserAuth {
    user: User!
    token: String!
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

  input SignupUserInput {
    userName: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    userName: String
    email: String
    password: String!
  }

  input AddMessageInput {
    message: String!
  }

  type Query {
    user(input: FilterUserInput!): User
    users(input: FilterUserInput): [User]!
    message(input: FilterMessageInput!): Message
    messages(input: FilterMessageInput): [Message]!
    me: User
  }

  type Mutation {
    signup(input: SignupUserInput!): UserAuth!
    login(input: LoginUserInput!): UserAuth!
    logout: String!
    addMessage(input: AddMessageInput!): Message!
  }

  type Subscription {
    messageAdded: Message!
  }
`;
