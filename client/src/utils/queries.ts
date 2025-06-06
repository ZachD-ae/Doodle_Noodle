import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
    query getUserData {
        getUserData {
            _id
            username
            email
            submissionDate
            drawings {
                _id
                imageURL
                artist {
                    _id
                }
            }
        }
    }
`;