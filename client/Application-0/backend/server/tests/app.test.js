const request = require("supertest")
const app = require("../index")

describe("Test example", ()=>{
  test("GET /",(done)=>{
    const res = await request(app)
    .get("/") 
    // .expect("Content-Type", /json/)
    .expect(200)
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
  
  test("GET tasks asc",(done)=>{
    const res = await request(app)
    .get("/tasks?direction=asc")
    .expect(200)
    .expect("Content-Type", /json/);
    
    expect(res.body.tasks[0]).toEqual({
      "_id": "62aa418a9014340022467091",
      "task_name": "task tracker",
      "date_created": "2022 06 15 Wed. Jun.",
      "time_created": "14:31:05",
      "total_time": "0",
      "stoppages": 0,
      "stoppage_times": []
     });
  });
  
  test("GET tasks asc",(done)=>{
    request(app)
    .get("/tasks?direction=as")
    .expect(400)
    .expect("Content-Type", /json/);
    
  });
  
  test("GET task 'break' ",()=>{
    const res = await request(app)
      .get("/tasks?taskname=break")
      .expect(200)
      .expect("Content-Type", /json/);
      expect(res.body.tasks[0]).toEqual({
         "_id": "62e98483e7040577e3447d3d",
         "task_name": "break",
         "date_created": "2022 08 02 Tue. Aug.",
         "time_created": "14:09:39",
         "total_time": "22 minutes 50 seconds",
         "stoppages": 1,
         "stoppage_times": [
          "00:22:50"
         ]
        });
  });
  
  test("GET test task name fetch asc order",()=>{
    const res = await request(app)
      .get('/tasks?taskname=break&direction=asc')
      expect(200)
      .expect("Content-Type", /json/);
    
    expect(res.body.tasks[0]).toEqual({
      "_id": "62aa42f3953c867b525c4367",
      "task_name": "break",
      "date_created": "2022 06 15 Wed. Jun.",
      "time_created": "14:37:07",
      "total_time": "1 hour 24 minutes",
      "stoppages": 1,
      "stoppage_times": [
       "00:26:41",
       "00:27:03",
       "00:21:15"
      ]
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