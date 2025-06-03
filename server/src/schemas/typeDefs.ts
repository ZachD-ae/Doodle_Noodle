import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    submissionDate: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Prompt {
    _id: ID!
    text: String!
    drawings: [Drawing]
    createdAt: String
  }

type DailyPrompt {
  date: String!
  prompt: Prompt!
}

  type Drawing {
    _id: ID!
    imageURL: String!
    prompt: Prompt
    artist: User
    createdAt: String
  }
    
  type Query {
    me: User
    dailyPrompt: Prompt
    hasSubmittedToday: Boolean
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): AuthPayload!
    submitDrawing(image:String): Drawing! 
  }
`;

export default typeDefs;