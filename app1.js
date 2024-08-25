import express from 'express';
import User from './models/user.js';
import { graphqlHTTP } from 'express-graphql';
const app=express();
const PORT=3000
const websites=[
    {
        id:1,
        name:"Google",
        ownerId:2
    },
    {
        id:2,
        name:'Facebook',
        ownerId:10
    },
    {
        id:3,
        name:'Github',
        ownerId:5
    },
    {
        id:4,
        name:'Instagram',
        ownerId:4
    },
    {
        id:5,
        name:'Amazon',
        ownerId:13
    },
    {
        id:6,
        name:'Baidu',
        ownerId:7
    },
    {
        id:7,
        name:'Crinifo',
        ownerId:6
    },
    {
        id:8,
        name:'Zapak',
        ownerId:9
    }
]
app.use("/graphql",graphqlHTTP({
    graphiql:true,
    schema:schema
}))

app.listen(PORT,()=>{
    console.log(`Listeinig on port ${PORT}`);
})