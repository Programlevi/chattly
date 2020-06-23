import { gql } from 'apollo-boost';

export const AUTH_USER = gql`
  query {
    me {
      id
      userName
      email
    }
  }
`;
