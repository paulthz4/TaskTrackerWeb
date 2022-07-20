import { Box, Typography } from '@mui/material';
import {React}  from 'react';
import TaskTracker from '../components/TaskTracker';
import './pages.css';
export default function Tracker(){
  return (
    <Box className="tracker-container" sx={{display: "flex", flexDirection:"column", width: "100%", margin:"5% auto", alignItems:"center", justifyContent:"center"}}>
      <Typography variant="h2" component="h2">Tracker page</Typography>
      <TaskTracker/>
    </Box>
  );
}