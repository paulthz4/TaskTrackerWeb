const request = require("supertest")
const app = require("../index")

describe("Test example", ()=>{
  test("GET /",(done)=>{
    request(app)
    .get("/") 
    // .expect("Content-Type", /json/)
    .expect(200)
    .expect((res)=>{
      res.body.data.length = 21;
    })
    .end((err,res)=>{
      if(err) return done(err)
      return done()
    })
  })
})