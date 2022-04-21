const express  = require('express')
const app = express()
const {MongoClient} = require('mongodb')

const uri = "mongodb+srv://casetrackerUser:<superSafe>@cluster0.uo7qm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)

async function run(){
  try{
    await client.connect()
    
    await client.db("case_tracker")
    console.log("connected successfully to server")
  }
  finally{
    await client.close()
  }
}
run().catch(console.dir)

app.listen(3002, () =>{
  console.log("running on port 3001")
})