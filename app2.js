import express from "express";
import{graphqlHTTP} from "express-graphql";
import mongoose from "mongoose";
import Student from "./models/student.js";
import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
const PORT=3000
let students=[
    {id:1,name:"John Doe",age:23},
    {id:2,name:"Foo Bar",age:18},
    {id:3,name:"Liz Lee",age:20},
    {id:4,name:"Kelly Nephis",age:27},
    {id:5,name:"Ascar Jebet",age:25},
    {id:6,name:"Olivia Jerry",age:21},
    {id:7,name:"Angel Ann",age:24},
]

const subjects=[
{id:1,code:"ENG101",name:"English"},
{id:2,code:"MATH101",name:"Matheatics"},
{id:3,code:"CHEM211",name:"Atomic Chemistry"},
{id:4,code:"GEO221",name:"Geography"},
]

const classes=[
    {id:1,subjectcode:"MATH1O1",studentsids:[4,5,6]},
    {id:2,subjectcode:"ENG101",studentsids:[1,3,7]},
    {id:3,subjectcode:"GEO221",studentsids:[1,2,5,6]},
]


const app=express();
const StudentType=new GraphQLObjectType({
    name:"Student",
    description:"Represents a Student",
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLString)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)},
        // createdAt:{type:Date}
    })
});

const SubjectType=new GraphQLObjectType({
    name:"Subject",
    description:"Represents a subject",
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLInt)},
        code:{type:new GraphQLNonNull(GraphQLString)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        // createdAt:{type:Date}
    })
})

const ClassType=new GraphQLObjectType({
    name:"RegisterStudent",
    description:"Register class type which requires the student id and subject code",
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLInt)},
        studentsids:{type:new GraphQLNonNull(new GraphQLList(GraphQLInt))},
        subjectcode:{type:new GraphQLNonNull(GraphQLString)}
    })
})

const RootQuery=new GraphQLObjectType({
    name:"Query",
    description:"This presents all the querries in the application",
    fields:()=>({
        students:{
            type:new GraphQLNonNull(new GraphQLList(StudentType)),
            description:"Fetches all sudents",
            resolve:()=>Student.find().then(res=>res)
        },
        student:{
            type:StudentType,
            description:"Fetch a single student",
            args:{
                ID:{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve:(parent,args)=>Student.findById({"_id":args.ID}).then(res=>res)
        },
        subjects:{
            type:new GraphQLNonNull(new GraphQLList(SubjectType)),
            description:"fetches a list of subjects",
            resolve:()=>subjects
        },
        subject:{
            type:SubjectType,
            description:"Fetches a single subject",
            args:{
                ID:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>subjects.find(subject=>subject.id===args.ID)
        },
        classes:{
            type:new GraphQLNonNull(new GraphQLList(ClassType)),
            description:"Fetches a list of classes",
            resolve:()=>classes
        },
        class:{
            type:ClassType,
            description:"Fetches a single class",
            args:{
                ID:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>classes.find(cl=>cl.id==args.ID)
        }
    })
})

const RootMutation=new GraphQLObjectType({
    name:"Mutation",
    description:"Root Mutation",
    fields:()=>({
        addStudent:{
            type:StudentType,
            description:"Add student to the list depicting a database",
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:async(parent,args)=>{
                const newStudent=Student({
                    name:args.name,
                    age:args.age
                })
                return newStudent.save().then(res=>res)
            }
        },
        deleteStudent:{
            type:StudentType,
            description:"Deletes a single student",
            args:{
                ID:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve:(parent,args)=>Student.findByIdAndDelete({"_id":args.ID}).then((res)=>res)
            
        },

        updateStudent:{
            type:StudentType,
            description:"Updates a given student given by id",
            args:{
                ID:{type:new GraphQLNonNull(GraphQLString)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>Student.findByIdAndUpdate(
                {"_id":args.ID},
                {name:args.name,age:args.age},
                {returnOriginal:false})
                .then(res=>res)
        }
    })
})

const schema=new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
})

mongoose.connect("mongodb://localhost:27017").then(res=>{
    app.listen(PORT,()=>{
        console.log(`Connected and listening on ${PORT}`)
    })
})

app.use("/graphql",graphqlHTTP({
    graphiql:true,
    schema:schema,
}))
