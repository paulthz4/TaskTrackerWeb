import React from 'react';
import {Divider, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";

export default function Task({task}){
  
  return(
    <>
      <ListItem sx={{display: 'flex', alignItems:'space-around', flexDirection: 'column'}}>
        <Typography>Task Name:{task.summary}</Typography>
      </ListItem>
      <ListItem>
        <Typography>Date Created:{task.date_created}</Typography>
      </ListItem>
      <ListItem>
        <Typography>Time created:{task.time_created}</Typography>
      </ListItem>
      <ListItem>
        <Typography>Total Time:{task.total_time} </Typography>
      </ListItem>
      <ListItem>
        <Typography>toppages:{task.stoppages} </Typography>
      </ListItem>
      <ListItem>
        <Typography>stoppage times:{task.stoppage_times}</Typography>
      </ListItem>
      <Divider/>
    </>
  );
}