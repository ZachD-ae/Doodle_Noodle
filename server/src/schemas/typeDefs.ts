import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    submissionDate: String
    drawings: [Drawing]
  }

  type AuthPayload {
    token: String!
    user: User
  }

  type Prompt {
    _id: ID!
    text: String!
    createdAt: String
  }

type DailyPrompt {
  _id: ID!
  date: String!
  prompt: Prompt!
  drawings: [Drawing]
}

  type Drawing {
    _id: ID!
    imageUrl: String!
    prompt: DailyPrompt!
    artist: User
    createdAt: String
  }
    
  type Query {
    getUserData: User
    dailyPrompt: DailyPrompt!
    hasSubmittedToday: Boolean
    getUserDrawings(userId: ID!): [Drawing]!
    getDrawingsByPrompt(promptId: ID!): [Drawing]!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): AuthPayload!
    submitDrawing(image:String!): Drawing!
  }
`;

export default typeDefs;