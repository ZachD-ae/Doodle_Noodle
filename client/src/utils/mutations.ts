import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation signup($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
        signup(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_DRAWING = gql`
    mutation addDrawing($id: _id, $userId: _id) {
        addDrawing(id: $id, userId: $userId) {
            token
            user {
                drawing
            }
        }
    }
`;