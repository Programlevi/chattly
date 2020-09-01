import { gql } from 'apollo-boost';

const authParts = gql`
  fragment AuthParts on UserAuth {
    token
    user {
      id
      userName
    }
  }
`;

const messageParts = gql`
  fragment MessageParts on Message {
    id
    message
    author {
      id
      userName
    }
    recipient
    type
    createdAt
  }
`;

export const AUTH_USER = gql`
  query {
    auth {
      ...AuthParts
    }
  }
  ${authParts}
`;

export const SIGNUP_USER = gql`
  mutation($input: SignupUserInput!) {
    signup(input: $input) {
      ...AuthParts
    }
  }
  ${authParts}
`;

export const LOGIN_USER = gql`
  mutation($input: LoginUserInput!) {
    login(input: $input) {
      ...AuthParts
    }
  }
  ${authParts}
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const SEND_MSG = gql`
  mutation($input: AddMessageInput!) {
    addMessage(input: $input) {
      ...MessageParts
    }
  }
  ${messageParts}
`;

export const GET_MSGS = gql`
  query($input: FilterMessageInput) {
    messages(input: $input) {
      ...MessageParts
    }
  }
  ${messageParts}
`;

export const NEW_MSG = gql`
  subscription {
    messageAdded {
      ...MessageParts
    }
  }
  ${messageParts}
`;

export const UPDATE_LAST_SEEN = gql`
  mutation {
    updateLastSeen
  }
`;

export const GET_ONLINE_USERS = gql`
  query {
    onlineUsers {
      id
      userName
    }
  }
`;
