import {React, useState, useEffect}  from 'react';
import {motion} from 'framer-motion/dist/framer-motion';
import { Box,TextField, Button, TextareaAutosize, Card, CardContent, Typography } from '@mui/material';

export default function Stopwatch(){
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  
  return (
    <Card className="task-tracker" p="1em"> 
      <CardContent sx={{display: "flex", flexDirection:"row", gap:'1em', alignItems:"center", justifyContent: "center"}}>
        <span>{("0" + Math.floor((time/ 3600000) % 60)).slice(-2)}</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)} :</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)} :</span>
        
      </CardContent>
      <Box sx={{display:"flex", gap:"1em", padding: "1em"}}>
        <Button size="small" variant="outlined" onClick={() => setRunning(true)}>Start</Button>
        <Button  size="small" variant="outlined" color="error" onClick={() => setRunning(false)}>Stop</Button>
        <Button  size="small" variant="outlined"  onClick={() => setTime(0)}>Reset</Button>       
      </Box>
    </Card>
  );
};