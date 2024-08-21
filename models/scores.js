import mongoose from "mongoose";
const Schema=mongoose.Schema;

const scoresSchema=new Schema({
    studentid:{
        type:String,
        required:true
    },
    english:{
        type:Number,
        required:true
    },
    kiswahili:{
        type:Number,
        required:true
    },
    math:{
        type:Number,
        required:true
    },
    science:{
        type:Number,
        required:true
    },
    sstandcre:{
        type:Number,
        required:true
    }
});

const Scores=mongoose.model("score",scoresSchema);

export default Scores;