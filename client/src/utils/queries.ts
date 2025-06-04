import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
    query getUserData {
        getUserData {
            id
            username
            email
            submissionDate
            drawings {
                id
                image
                prompt {
                    id
                    text
                }
                artist {
                    id
                    username
                }
            }

        }
    }
`;