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
      topic
      id
    }
  }
`;
export const ADD_STORY = gql`
  mutation addToStory($topic: String!, $plot: String!) {
    addStory(topic: $topic, plot: $plot) {
      plot
    }
  }
`;

export const EDIT_STORY = gql`
  mutation storyEdit($plot: String!, $id: String!) {
    editStory(plot: $plot, id: $id) {
      plot
    }
  }
`;

export const REMOVE_STORY = gql`
  mutation storyRemove($id: String!) {
    removeStory(id: $id) {
      plot
    }
  }
`;

export const SELECT_TOPIC = gql `
  query getAllTopics{
    allTopics{
      topic
      id
    }
  }
`

export const ADD_TOPIC = gql `
  mutation addToTopics($topic: String!){
    addTopic(topic: $topic){
      topic
    }
  }
`
export const STORIES_BY_TOPIC = gql `
  query topicStory($topic: String!){
    storiesByTopic(topic: $topic){
      plot
      id
    }
  }
`
export const MY_STORIES = gql `
  query myContribution{
    me{
      stories{
        topic
        plot 
        id
      }
    }
  }
`

export const SEARCH =  gql `
  query topicSearch($topic: String!){
    storiesByTopic(topic: $topic){
      topic
      plot
      id
    }
  }
`