import mongoose from "mongoose";
const Schema=mongoose.Schema;

const SubjectSchema=new Schema({
    code:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
},
{
    timestamps:true
})