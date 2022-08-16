import React, {useState} from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box, Card} from "@mui/material";
import {motion} from 'framer-motion/dist/framer-motion';
import { Typography } from '@material-ui/core';
import './pages.css';

export default function Settings(){

  return (
    <Box className="tracker-container" p={4} component={motion.div} sx={{display: "flex", flexDirection:"column", width: "100%", margin:"5% auto", alignItems:"center", justifyContent:"center"}}>
      <Card sx={{padding: "3em", width:"90%"}} className="tracker-container">
        <Typography variant="h3" p={3}>Settings</Typography>
      </Card>
    </Box>
  );
}