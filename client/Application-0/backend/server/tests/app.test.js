const request = require("supertest")
const app = require("../index")

describe("Test example", ()=>{
  test("GET /",(done)=>{
    request(app)
    .get("/") 
    // .expect("Content-Type", /json/)
    .expect(200)
    .expect((res)=>{
      res.body.data.length = 22;
    })
    .end((err,res)=>{
      if(err) return done(err)
      return done()
    })
  });
  
  test("GET tasks?",(done)=>{
    request(app)
    .get("/tasks?taskName=break")
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err,res)=>{
      if(err) return done(err);
      return done();
    });
  });
})