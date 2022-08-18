import React, {useState} from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box, Card, Typography,FormGroup, Switch, FormControlLabel, InputLabel, TableContainer, TableHead, TableBody, TableRow, TableCell, Table} from "@mui/material";
import {motion} from 'framer-motion/dist/framer-motion';
import './pages.css';

export default function Settings(){

  return (
    <Box className="tracker-container" p={4} component={motion.div} 
      initial={{opacity:0}}
      animate={{opacity:1, transition:{duration:0.6}}}
      exit={{opacity:0, transition:{duration:0.2}}} 
      sx={{display: "flex", flexDirection:"column", width: "100%", margin:"5% auto", alignItems:"center", justifyContent:"center"}}
    >
      <Card elevation={0} sx={{padding: "3em", width:"80%", backgroundColor: '#e6f7ff'}} className="tracker-container">
        <Typography variant="h3" p={3}>Settings</Typography>
        <TableContainer elevation={0} component={Card} sx={{width:"50%"}}>
          <Table >
            <TableHead></TableHead>
            <TableBody>
              <TableRow>
                <TableCell >Dark Mode</TableCell>
                <TableCell ><Switch /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>test@test.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>tasks</TableCell>
                <TableCell>42</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}