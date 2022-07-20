import React from 'react';
import { TodoItemsPage } from "../pages/TodoItemsPage";
import {Route,Routes, Link, useLocation} from "react-router-dom";
import {motion,AnimatePresence} from 'framer-motion/dist/framer-motion';
import Insights from '../pages/Insights';
import Tracker from '../pages/Tracker';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function AnimatedRoutes(){
  const location = useLocation();
  return (
  <AnimatePresence exitBeforeEnter>
    <Stack direction="row" spacing="2" sx={{m:2, position:"fixed"}}>
    <Paper component={motion.div} drag >
      <MenuList  >
        <Link to="/" className="link"><MenuItem component="router.Link" to="/">Home</MenuItem></Link>
        <Link to="/insights" className="link"><MenuItem component="Link" to="/insights">Insights</MenuItem></Link>
        <Link to="/tracker" className="link"><MenuItem component="Link" to="/Tracker">Tracker</MenuItem></Link>
      </MenuList>
    </Paper>
    </Stack>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<TodoItemsPage />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="tracker" element={<Tracker />}/>
    </Routes>
    </AnimatePresence>  
  );
}