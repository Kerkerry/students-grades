import mongoose from "mongoose";
const Schema=mongoose.Schema;

const bookSchema=new Schema(
    {
        author:{
            firstname:{
                type:String,
                required:true
            },
            secondname:{
                type:String,
                required:true
            },
            country:{
                type:String,
                required:true
            }
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true
    }
);

const Book=mongoose.model("Book",bookSchema)

export default Book