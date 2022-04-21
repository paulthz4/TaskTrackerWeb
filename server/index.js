const express  = require('express')
const app = express()
const {MongoClient, Collection} = require('mongodb')

const uri = "mongodb+srv://newUser2:superSafe2@cluster0.uo7qm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let collection
// connecting to mongodb using MongoClient.connect static method
MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  
  collection = database.db('case_tracker').collection("test_cases")
  app.listen(process.env.PORT || 3002, () => {
  console.log('listening on 3002')
  })
})

app.get('/', (req,res)=>{
  collection.find({}).toArray((err,result)=>{
    if(err) return console.log(err)
    console.log(result)
    res.send(result)  
  })
  
})
