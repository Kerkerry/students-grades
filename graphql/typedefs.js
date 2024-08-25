import { gql } from "apollo-server";

const typeDefs=gql`
type User{
        firstname:String
        secondname:String
        useremail:String
        password:String
        createdAt:String
        updatedAt:String
    }
input UserInput {
    firstname:String,
    secondname:String,
    useremail:String,
    password:String   
}

type Query {
    user(ID:ID!):User!
    getUsers(count:Int):[User]
    
}

type Mutation{
    createUser(userInput:UserInput):User!
    deleteUser(ID:ID!):Boolean
    updateUser(ID:ID!,userInput:UserInput):Boolean
}
    `;

export default typeDefs;