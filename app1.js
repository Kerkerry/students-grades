import express from 'express';
import User from './models/user.js';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
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
        id:{type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        ownerId:{type:new GraphQLNonNull(GraphQLInt)}
    })
});

const OwnerType=new GraphQLObjectType({
    name:"owner",
    description:"This represents the owner ",
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
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
        },
        website:{
            type:WebsiteType,
            description:"Returns Single website",
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent,arg)=>websites.find(website=>website.id==arg.id)
        },
        owner:{
            type:OwnerType,
            description:"Returns a single owner",
            args:{
                id:{type:GraphQLInt}
            },
            resolve:(parent,arg)=>owners.find(owner=>owner.id==arg.id)
        }
    })
});

const RootMutation=new GraphQLObjectType({
    name:"Mutation",
    description:"Root Mutation",
    fields:()=>({
        addWebsite:{
            type:WebsiteType,
            description:"Add a website",
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                ownerId:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>{
                const website={id:websites.length+1,name:args.name,ownerId:args.ownerId};
                websites.push(website);
                return website;
            }
        },
        removeWebsite:{
            type:WebsiteType,
            description:"Delete a single website",
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>{
                websites.filter(website=>website.id!==args.id)
                return websites[args.id]
            }
        },
        updateWebsite:{
            type:WebsiteType,
            description:"Update a website",
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                ownerId:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>{
                websites[args.id-1].name=args.name;
                websites[args.id-1].ownerId=args.ownerId;
                return websites[args.id-1];
            }
        },
        addOwner:{
            type:OwnerType,
            description:"Add a single owner",
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve:(parent,args)=>{
                const owner={
                    id:owners.length+1,
                    name:args.name
                };
                owners.push(owner);
                return owner;
            }
        },
        updateOwner:{
            type:OwnerType,
            description:"Update owner",
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)},
                name:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve:(parent,args)=>{
                owners[args.id-1].name=args.name
                return owners[args.id-1];
            }
        },
        removeOwner:{
            type:OwnerType,
            description:"Deleting owner",
            args:{
                id:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>{
                owners.filter(owner=>owner.id!==args.id)
                owners[args.id]
            }
        }
    })
})

const schema=new GraphQLSchema({
    query:RootQueryType,
    mutation:RootMutation
})

app.use("/graphql",graphqlHTTP({
    graphiql:true,
    schema:schema
}))


app.listen(PORT,()=>{
    console.log(`Listeinig on port ${PORT}`);
})