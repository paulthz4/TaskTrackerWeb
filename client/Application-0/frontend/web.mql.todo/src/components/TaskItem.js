import React from 'react';
import {ListItem, Box,  Typography} from "@mui/material";
import {motion, AnimatePresence} from 'framer-motion/dist/framer-motion';

export default function Task({task}){
  const variants = {
    visible:{opacity: 1, y: 25},
    hidden: {opacity: 0, y: -25}
  }

  return(
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{duration: 1.3}}
      sx={{
        boxShadow: 2,
        my: 7,
        p: 3,
        borderRadius: 3,
        backgroundColor: '#e6f4ff',
        minWidth: 300,}}
      >
      <ListItem >
        <Typography variant='h5'>{task.task_name}</Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#FFCA3C'}}>Date Created:</span> {task.date_created}</Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#FFCA3C'}}>Time created:</span> {task.time_created}</Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#FFCA3C'}}>Total Time:</span> {task.total_time} </Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#FFCA3C'}}> Stoppages:</span> {task.stoppages} </Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#FFCA3C'}}>Stoppage times:</span> {task.stoppage_times.map((time, index) => <><br/><span key={index}>{time}</span><br/></>)}</Typography>
      </ListItem>
    </Box>
  );
}