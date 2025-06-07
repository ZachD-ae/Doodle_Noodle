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
                imageUrl
                artist {
                    _id
                }
            }
        }
    }
`;

export const GET_DAILY_PROMPT = gql`
    query dailyPrompt {
        dailyPrompt {
            _id
            date
            prompt {
                text
            }
        }
    }
`