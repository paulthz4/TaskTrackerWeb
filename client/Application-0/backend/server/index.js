const express  = require('express');
const app = express();
const cors  = require('cors');
const {MongoClient} = require('mongodb');

app.set('json spaces', 1);
app.use(cors());

// const uri = process.env.URI;
const uri = "mongodb+srv://newUser2:superSafe2@cluster0.uo7qm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let collection;
// connecting to mongodb using MongoClient.connect static method
MongoClient.connect(uri, (err, database) => {
  if (err) 
    return console.log(err)
  collection = database.db('all_tasks').collection("tasks")
  app.listen( 3002, () => {
  console.log('listening on 3002')
  });
});

app.get('/', async (req,res)=>{
  collection.find().sort({"date_created":-1,"time_created": -1}).toArray((err,result)=>{
    if(err)
      console.log(err);
    res.status(200).json({"tasks": result});
    return;
  });
});
app.get('/tasks', async (req,res)=>{
  let direction;
  if(!req.query.direction || req.query.direction === 'desc')
    direction = -1;
  if(req.query.direction ==='asc')
    direction = 1;
  
  let cursor;
  if(req.query.taskName){
    cursor = collection.find({"task_name": req.query.taskName}).sort({"date_created": direction, "time_created": 1});
    res.status(200).json({"tasks": await cursor.toArray()});
    return;
  }  
  
  if(!req.query.taskName)
    collection.find({}).sort({"date_created": direction, "time_created": 1}).toArray((err,result)=>{
      console.log('own sorting')
      res.status(200).json({"tasks": result});
      return;
    });
});
module.exports = app;
