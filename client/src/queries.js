import { gql } from 'apollo-boost';

export const AUTH_USER = gql`
  query {
    auth {
      token
      user {
        id
        userName
        email
      }
    }
  }
`;

const authParts = gql`
  fragment AuthParts on UserAuth {
    token
    user {
      id
      userName
      email
    }
  }
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

export const SEND_MSG = gql`
  mutation($input: AddMessageInput!) {
    addMessage(input: $input) {
      id
      message
      author {
        id
        userName
      }
      createdAt
    }
  }
`;

export const GET_MSGS = gql`
  query($input: FilterMessageInput) {
    messages(input: $input) {
      id
      message
      author {
        id
        userName
      }
      createdAt
    }
  }
`;

export const NEW_MSG = gql`
  subscription {
    messageAdded {
      id
      message
      author {
        id
        userName
      }
      createdAt
    }
  }
`;
