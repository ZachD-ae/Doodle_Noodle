import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): String
    signup(username: String!, email: String!, password: String!): String
  }
`;

export default typeDefs;