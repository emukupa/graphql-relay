import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Friend {
    id: ID 
    firstName: String 
    lastName: String
    gender: String 
    age: Int
    language: String 
    email: String
  }

  type Query {
    getFriend(id: ID!): Friend
    getFriends: [Friend]
  }

  input FriendInput {
    id: ID 
    firstName: String 
    lastName: String
    gender: String 
    age: Int
    language: String 
    email: String
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
    updateFriend(id: ID!, input: FriendInput): Friend
    deleteFriend(id: ID!): Boolean
  }
`);
export default schema;
