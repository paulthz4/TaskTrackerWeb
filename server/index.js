const express  = require('express');
const app = express();
const {MongoClient} = require('mongodb');

app.set('json spaces', 1);

const uri = "mongodb+srv://newUser2:superSafe2@cluster0.uo7qm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let collection;
// connecting to mongodb using MongoClient.connect static method
MongoClient.connect(uri, (err, database) => {
  if (err) 
    return console.log(err)
  collection = database.db('case_tracker').collection("cases")
  app.listen( 3002, () => {
  console.log('listening on 3002')
  });
});

app.get('/', (req,res)=>{
  collection.find().sort({"date created":-1}).project({_id: 0}).toArray((err,result)=>{
    if(err)
      console.log(err);
    // console.log(result);
    res.status(200).json(result);
  });
  
  app.get('/tasks',(req,res)=>{
    collection.find({"taskName": req.query.taskName.trim()}).sort({"date created": -1}).project({_id: 0})
    .toArray((err,result)=>{
      res.status(200).json(result);
    })
  });
 
});
module.exports = app;
