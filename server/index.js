const express  = require('express')
const app = express()
const {MongoClient} = require('mongodb')

const uri = "mongodb+srv://newUser2:superSafe2@cluster0.uo7qm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)
let tasks = [];
async function run(){
  try{
    await client.connect()
    
    const db = client.db("case_tracker")
    //console.log("connected successfully to server")
    const collection = db.collection("test_cases")
    const query = { taskName: "api testing" }
    
    const options = {
      sort:{projection: {_id:0, taskName: 1}}
    }
    
    const task = collection.find({})
    await task.forEach(doc => {
      tasks.push(doc)
      console.log(doc)
    })
    console.log(task)
  }
  finally{
    await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req,res)=>{
  run()
  let str = "";
  for(let i=0; i<tasks.length; i++){
    str += +"\n"
  }
  res.send('hello world\n' + str)
})

app.listen(3002, () =>{
  console.log("running on port 3002")
})