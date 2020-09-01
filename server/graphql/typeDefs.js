const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    userName: String!
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
    recipient: String
    type: MessageTypeEnum!
    createdAt: String!
  }

  input FilterMessageInput {
    id: ID
    message: String
    author: ID
    createdAt: String
  }

  input SignupUserInput {
    userName: String!
    password: String!
  }

  input LoginUserInput {
    userName: String
    password: String!
  }

  input UpdateUserInput {
    userName: String
    lastSeen: String
  }

  input AddMessageInput {
    message: String!
    reciepient: String
    type: MessageTypeEnum!
  }

  input QueryOptionsInput {
    page: Int!
    limit: Int!
    orderBy: [String]!
  }

  enum StatusEnum {
    SUCCESS
    FAILED
  }

  enum MessageTypeEnum {
    PRIVATE
    GROUP
  }

  type Query {
    onlineUsers: [User]!
    messages(
      input: FilterMessageInput
      queryOptions: QueryOptionsInput
    ): [Message]!
    auth: UserAuth
  }

  type Mutation {
    signup(input: SignupUserInput!): UserAuth!
    login(input: LoginUserInput!): UserAuth!
    logout: String!
    updateLastSeen: StatusEnum!
    addMessage(input: AddMessageInput!): Message!
  }

  type Subscription {
    messageAdded: Message!
  }
`;
