import express from 'express';
import User from './models/user.js';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
const app=express();
const PORT=3000
const owners=[
    {
        id:1,
        name:"John Astle"
    },
    {
        id:2,
        name:"Gautam Sharma"
    },
    {
        id:3,
        name:"Kane Williamson"
    }
]
const websites=[
    {
        id:1,
        name:"Google",
        ownerId:2
    },
    {
        id:2,
        name:'Facebook',
        ownerId:3
    },
    {
        id:3,
        name:'Github',
        ownerId:1
    },
    {
        id:4,
        name:'Instagram',
        ownerId:3
    },
    {
        id:5,
        name:'Amazon',
        ownerId:2
    },
    {
        id:6,
        name:'Baidu',
        ownerId:1
    },
    {
        id:7,
        name:'Crinifo',
        ownerId:2
    },
    {
        id:8,
        name:'Zapak',
        ownerId:3
    }
]

const WebsiteType=new GraphQLObjectType({
    name:"website",
    description:"This represents a websites made by the owner who is a programmer",
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        ownerId:{type:GraphQLNonNull(GraphQLInt)}
    })
});

const OwnerType=new GraphQLObjectType({
    name:"owner",
    description:"This represents the owner ",
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
    })
});

const RootQueryType=new GraphQLObjectType({
    name:"Query",
    description:"Root Query",
    fields:()=>({
        websites:{
            type:new GraphQLList(WebsiteType),
            description:"List of all websits",
            resolve:()=>websites
        },
        owners:{
            type:new GraphQLList(OwnerType),
            description:"List of owners",
            resolve:()=>owners
        }
    })
});



app.use("/graphql",graphqlHTTP({
    graphiql:true,
    schema:schema
}))


app.listen(PORT,()=>{
    console.log(`Listeinig on port ${PORT}`);
})