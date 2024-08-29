import mongoose from "mongoose";
const Schema=mongoose.Schema;

const studentSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
    },
    {
        timestamps:true
    }
)

const Student=mongoose.model("student",studentSchema)
export default Student;