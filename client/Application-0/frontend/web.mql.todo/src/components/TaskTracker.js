import { Box,TextField, Button, TextareaAutosize } from '@mui/material';
import React, {useState} from 'react';
import  './App.css';
export default function TaskTracker(){
  
  return(
    <Box margin="normal" className="task-tracker" border="1px solid grey" p="1em">
      <Box sx={{display:"flex",gap:"1em", margin:"auto",flexGrow:"1", flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
        <TextField size="small" placeholder="New Task"/><Button  size="small" variant="outlined">New Task</Button>
      </Box>
      <TextareaAutosize style={{borderRadius:"3%", fontFamily:"sans-serif", color:"red"}} minRows={4} placeholder="task data"/>
      <Box sx={{display:"flex", gap:"1em"}}>
        <Button size="small" variant="outlined">Start</Button><Button size="small" variant="outlined" color="error">Stop</Button>
      </Box>
    </Box>
  );
}