import {gql} from '@apollo/client'

export const CREATE_USER = gql `
    mutation createUser($username: String!){
        createUser(username: $username){
            username
        }
    }
`

export const LOGIN = gql `
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const GET_TASK = gql `
    query myTasks{
        me{
            activities{
                task
            }
        }
    }
`

export const ADD_TASK = gql `
    mutation addTask($task: String!){
        createAct(task: $task){
            task
        }
    }
`