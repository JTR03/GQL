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

export const GET_STORIES = gql`
  query getAll {
    allStories {
      plot
      character
      id
    }
  }
`;
export const ADD_STORY = gql`
  mutation addToStory($character: String!, $plot: String!) {
    addStory(character: $character, plot: $plot) {
      character
      plot
    }
  }
`;
