import { Box,TextField, Button } from '@mui/material';
import React, { useState} from 'react';
import  './App.css';
export default function TaskTracker(){
  
  return(
    <Box display="flex" className="task-tracker">
      <TextField></TextField><Button variant="outlined">New Task</Button>
    </Box>
  );
}