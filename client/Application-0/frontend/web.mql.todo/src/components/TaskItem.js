import React from 'react';
import {Divider, ListItem, Box, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import { red } from '@material-ui/core/colors';

export default function Task({task}){
  
  return(
    <Box sx={{
      my: 2,
      p: 2,
      boxShadow: 3,
      borderRadius: 18,
      backgroundColor: '#e6f4ff',
      minWidth: 300,
    }}>
      <ListItem >
        <Typography><span style={{color: '#FFCA3C'}}>Task Name:</span> {task.task_name}</Typography>
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
        <Typography><span style={{color: '#FFCA3C'}}> toppages:</span> {task.stoppages} </Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#FFCA3C'}}>stoppage times:</span> {task.stoppage_times}</Typography>
      </ListItem>
    </Box>
  );
}