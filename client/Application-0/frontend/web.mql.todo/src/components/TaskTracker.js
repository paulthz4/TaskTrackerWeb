import { Box,TextField, Button, TextareaAutosize, Card, CardContent, Typography } from '@mui/material';
import React, {useState} from 'react';
import  './App.css';

export default function TaskTracker(){
  // 
  const [text, setText] = useState('00:00');
  
  const timer = document.getElementById('stopwatch');

let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;

function startTimer() {
  if (stoptime === true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime === false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime === false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    setText(hr + ':' + min + ':' + sec);

    setTimeout(timerCycle(), 1000);
  }
}
  
  function resetTimer() {
    setText("00:00:00");
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
  }
  
  return(
    <Card className="task-tracker" p="1em">
      <CardContent sx={{display: "flex", flexDirection:"column", gap:'1em', alignItems:"center"}}>
        <Box sx={{display:"flex",gap:"1em", margin:"auto",alignItems:"center", justifyContent:"space-around"}}>
          <TextField size="small" placeholder="New Task"/><Button  size="small" variant="outlined">New Task</Button>
        </Box>
        <Typography variant='h4' sx={{p:2}}>{text}</Typography>
        <Box sx={{display:"flex", gap:"1em", }}>
          <Button size="small" variant="outlined" onClick={()=>startTimer()}>Start</Button><Button size="small" variant="outlined" color="error" onClick={()=>stopTimer()}>Stop</Button>
        </Box>
      </CardContent>
    </Card>
  );
}