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