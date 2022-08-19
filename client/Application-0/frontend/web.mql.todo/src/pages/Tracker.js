import { Box, Card, CardContent, FormControl, TextField, Typography } from '@mui/material';
import React, {useState}  from 'react';
// import TaskTracker from '../components/TaskTracker';
import './pages.css';
import {motion} from 'framer-motion/dist/framer-motion';
import Stopwatch from '../components/Stopwatch';
export default function Tracker(){
  const [task, setTask] = useState("");

  return (
    <Box className="tracker-container" component={motion.div} sx={{display: "flex", flexDirection:"column", width: "100%", margin:"5% auto", alignItems:"center", justifyContent:"center"}}
      initial={{opacity: 0}}
      animate={{opacity:1, transition:{duration:0.6}}}
      exit={{opacity: 0, transition:{duration:0.2}}}
    >
      <Typography variant="h2" component="h2">Task Tracker</Typography>
      <Stopwatch task={task} />
      <Card elevation={0} sx={{padding: "1em",border:"solid 0.5px black", width:"50%"}} >
        <CardContent>
          <FormControl>
            <TextField label="task name" onChange={(e)=>setTask(e.target.value)} />
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
}