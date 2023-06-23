import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!) {
    createUser(username: $username) {
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_TASK = gql`
  query myTasks {
    me {
      activities {
        task
        id
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($task: String!) {
    createAct(task: $task) {
      task
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($id: String!, $task: String!) {
    editTask(id: $id, task: $task) {
      task
    }
  }
`;
export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(id: $id) {
      task
    }
  }
`;
