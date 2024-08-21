import mongoose from "mongoose";
 const Schema=mongoose.Schema;

 const userSchema=new Schema(
    {
        firstname:{
            type:String,
            required:true
        },
        secondname:{
            type:String,
            required:true
        },
        useremail:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
    },
    {
        timestamps:true
    }
 );

 const User=mongoose.model("user",userSchema)

 export default User;

























// https://stackoverflow.com/questions/2998215/if-python-is-interpreted-what-are-pyc-files