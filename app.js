import express, { json } from 'express'
import mongoose from 'mongoose'
import User from './models/user.js'
import Scores from './models/scores.js';
const app=express()

mongoose.connect("mongodb://localhost:27017").then((response)=>{
    app.listen(3000)
}).catch(err=>console.log(err)
)

app.get("/get-users", (req,res)=>{
    User.find().then((result)=>{
        res.send(result)
    })
})

app.get("/get-user/:param",(req, res)=>{
    const id=req.params.param;
        User.findById(id).then((result)=>{
            return result;
        })
});

app.get("/delete-scores/:id",(req,res)=>{
    Scores.deleteOne({"studentid": req.params.id}).then((result)=>res.send(result));
})

app.delete("/delete-student/:id",(req,res)=>{
    const id=req.params.id;
    Scores.deleteOne({'studentid':id}).then((result)=>{
    User.deleteOne({"_id":id}).then((result)=>{
        res.send(result);
    })})
})

app.post("/create-student/:student",(req,res)=>{
    const std=JSON.parse(req.params.student);
    
 
    const user=User({
        firstname:std.firstname,
        secondname:std.secondname,
        useremail:std.email,
        password:std.password
    })
    user.save().then((result)=>{
        res.send(result)
    })
})

app.get("/scores",(req,res)=>{
    let studentscores=[];
    Scores.find()
    .then(
        (result)=>{
            res.send(result)            
        }
    ).then(()=>console.log(studentscores))
    

    
})

app.get("/scores/:id",(req,res)=>{
    const studentid=req.params.id;
    Scores.findOne({'studentid':studentid}).then((result)=>{
        res.send(result)
    })
});

app.get("/get-student-scores/:id",(req,res)=>{
    const studentid=req.params.id;
    Scores.findById({'_id':studentid}).then((result0)=>{
        User.findById({"_id":result0.studentid}).then((result1)=>{
            res.send({
                "studentid":result1.id,
                "scoresid":result0.id,
                "firstname":result1.firstname,
                "secondname":result1.secondname,
                "email":result1.useremail,
                "english":result0.english,
                "kiswahil":result0.kiswahili,
                "math":result0.math,
                "science":result0.science,
                "sstandcre":result0.sstandcre
            });
        })
    })
});
app.post("/add-scores/:score",(req,res)=>{
    const scorefromapi=JSON.parse(req.params.score);
    const score=Scores(
        {
            studentid:scorefromapi.studentid,
            english:scorefromapi.english,
            kiswahili:scorefromapi.kiswahili,
            math:scorefromapi.math,
            science:scorefromapi.science,
            sstandcre:scorefromapi.sstandcre
        }
    );
    score.save()
    .then(
        (result)=>res.send(result))
    .catch(err=>console.log(err)
    );
})

