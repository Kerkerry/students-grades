// import { Query,Mutation } from 'mongoose';
import User from '../models/user.js'
const resolvers={
    Query:{
        async user(_,{ID}){
           return  await User.findById(ID)
        },
        async getUsers(_,{count}){
            return User.find().sort({id:-1}).limit(count);
        }
    },
    Mutation:{
        async createUser(_,{userInput:{firstname,secondname,useremail,password}}){
            const createdUser=new User({
                "firstname":firstname,
                "secondname":secondname,
                "useremail":useremail,
                "password":password,
                // "createdAt":new Date().toISOString(),
                // "updatedAt":new Date().toISOString()
            });

            const res=await createdUser.save();
            return {
                id:res.id,
                ...res._doc
            }
        },

        async deleteUser(_,{ID}){
            const wasDeleted=(await User.deleteOne({_id:ID})).deletedCount;
            
            return wasDeleted;// Returns 1 if was deleted successfully and 0 if nothing was deleted
        },
        async updateUser(_,{ID,userInput:{firstname,secondname,useremail,password}}){
            const wasUpdated=(await User.findOneAndUpdate(
                {_id:ID},
                {
                    firstname:firstname,
                    secondname:secondname,
                    useremail:useremail,
                    password:password
                }
            )).modifiedCount
            return wasUpdated;// Returns 1 if was Updated successfully and 0 if nothing was Updated
        }
    }
}

export default resolvers;