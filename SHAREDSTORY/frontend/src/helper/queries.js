import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation registerUser($username: String!) {
    createUser(username: $username) {
      username
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
