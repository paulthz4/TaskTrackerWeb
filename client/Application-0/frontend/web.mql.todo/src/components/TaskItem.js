import React from 'react';
import {Divider, ListItem, Box, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import { red } from '@material-ui/core/colors';

export default function Task({task}){
  
  return(
    <Box sx={{
      bgcolor: red,
      boxShadow: 1,
      borderRadius: 2,
      backgroundColor: 'aliceblue',
      p: 2,
      minWidth: 300,
    }}>
      <ListItem >
        <Typography><span style={{color: '#ffa615'}}>Task Name:</span> {task.task_name}</Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#ffa615'}}>Date Created:</span> {task.date_created}</Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#ffa615'}}>Time created:</span> {task.time_created}</Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#ffa615'}}>Total Time:</span> {task.total_time} </Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#ffa615'}}> toppages:</span> {task.stoppages} </Typography>
      </ListItem>
      <ListItem>
        <Typography><span style={{color: '#ffa615'}}>stoppage times:</span> {task.stoppage_times}</Typography>
      </ListItem>
      <Divider/>
    </Box>
  );
}