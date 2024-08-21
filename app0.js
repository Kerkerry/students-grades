import express from 'express'
import mongoose from 'mongoose'
import Book from './models/book.js'
const app=express()
var db=null;
mongoose.connect("mongodb://localhost:27017")
.then((response)=>{
    console.log("connected successfully");
    // console.log(response.connection.db.collections);
    db=response.connection.db
    
    app.listen(3000)
})
.catch(err=>console.log(err))



app.get("/",(req,res)=>{
    const book=new Book({
        author:{
            firstname:"Kerry",
            secondname:"Mwai",
            country:"Kenya"
        },
        title:"Android development",
        description:"designing and developing mobile applications",
        price:899.75
    })

    book.save()
    .then((result)=>{
        res.send(result)
        
    })
    .catch(err=>console.log(err)
    )
})

app.get("/addmany",(req,res)=>{
    const book0=new Book({
        author:{
            firstname:"Jimmy",
            secondname:"Wanjiki",
            country:"Kenya"
        },
        title:"Long walk for freedom",
        description:"The struggles towards freedom",
        price:128.86
    })
    const book1=new Book({
        author:{
            firstname:"Kerry",
            secondname:"Mwai",
            country:"Kenya"
        },
        title:"Android development",
        description:"designing and developing mobile applications",
        price:899.75
    })
    const book2=new Book({
        author:{
            firstname:"Alex",
            secondname:"Fergurson",
            country:"England"
        },
        title:"How to lead",
        description:"The rules and principles of being a team leader",
        price:505.5
    })
    db.collection("books").insertMany([book0,book1,book2]).then((result)=>{
        console.log(result);
        res.send(result)
        
    }).catch(err=>console.log(err)
    )
})

app.get("/updatemany",(req,res)=>{
    const book0=new Book({
        author:{
            firstname:"Elizabeth",
            secondname:"Sharon",
            country:"Australia"
        },
        title:"HTML and CSS",
        description:"Creating and developing webs",
        price:155.80
    })
    const book1=new Book({
        author:{
            firstname:"Lee",
            secondname:"Kinyanjui",
            country:"Tanzania"
        },
        title:"Java and Android development",
        description:"designing and developing mobile applications",
        price:600.75
    })
    const book2=new Book({
        author:{
            firstname:"Oliver",
            secondname:"Rich",
            country:"USA"
        },
        title:"How to lead project team",
        description:"The rules and principles of being a team leader of project management",
        price:167.5
    })
    db.collection("books").updateMany(
        [{"_id":"66bdd2598bb7aaf20ec4d395"},{"_id":"66bdd2598bb7aaf20ec4d396"},{"_id":"66bdd2598bb7aaf20ec4d397"}],
        {book1,book0,book2}
    ).then((result)=>{
        console.log(result);
        res.send(result)
        
    }).catch(err=>console.log(err)
    )
})
app.get("/book/:price", (req,res)=>{
    const price=req.params.price
    Book.findOne({"price":price}).then((result)=>{
        console.log(result);
        
        res.send(result);
    }).catch(err=>console.log(err)
    )
})
app.get("/books",(req,res)=>{
    Book.find()
    .sort({createdAt:-1})
    .then((result)=>{
        console.log(result);
        
        res.send(result)
    })

})

app.get("/deleteBook/:id",(req,res)=>{
    const id=req.params.id
    Book.findByIdAndDelete(id).then((result)=>{
        res.send(result)
    })
    .catch(err=>console.log(err)
    )
});

app.get("/updateBook",(req, res)=>{
    Book.findByIdAndUpdate(
        {'_id':'66bd0317de60c72d9f8e5780'},
       {$set:{
            'author':{
                'firstname':"Jeniffer",
                'secondname':"Park",
            },
            'price':1001.75
        }},
        { returnOriginal: false }
    ).then((result)=>{
        res.send(result)
        console.log(result);
        
    }).catch(err=>console.log(err)
    )
})

app.get('/replaceBook',(req,res)=>{
    Book.findOneAndReplace(
       {"author": {"firstname": "Kerry",
      "secondname": "Mwai",
      "country": "Kenya"}},
       {
        "author":{
            'firstname':"Kerry",
            'secondname':'Wangamati',
            'country':'South Africa'
        },
        'title':"Javascript Development",
        'description':"Web development and backend integration",
        'price':1450.88
       },
       {returnOriginal:false}
    ).then((result)=>{
        console.log(result);
        
        res.send(result)
    }).catch(err=>console.log(err)
    )
})

// https://www.geeksforgeeks.org/difference-between-findoneandupdate-and-findoneandreplace-in-mongodb/