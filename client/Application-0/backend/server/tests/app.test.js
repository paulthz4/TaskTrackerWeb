const request = require("supertest")
const app = require("../index")

describe("Test example", ()=>{
  test("GET /",(done)=>{
    const res = await request(app)
    .get("/") 
    // .expect("Content-Type", /json/)
    .expect(200)
    .expect((res)=>{
      res.body.data.length = 22;
    })
    .end((err,res)=>{
      if(err) return done(err)
      return done()
    });
    
    expect(res.body.tasks[0]).toEqual({
      _id: "62aa418a9014340022467091",
      task_name: "task tracker",
      date_created: "2022 06 15 Wed. Jun.",
      time_created: "14:31:05",
      total_time: "0",
      stoppages: 0,
      stoppage_times: []
    });
  });
  
  test("GET tasks?",(done)=>{
    request(app)
    .get("/tasks?taskName=break")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect(res.body)
    .end((err,res)=>{
      if(err) return done(err);
      return done();
    });
  });
})