import React from 'react';
import { TodoItemsPage } from "../pages/TodoItemsPage";
import {BrowserRouter,Route,Routes, Link, useLocation} from "react-router-dom";
import {motion,AnimatePresence} from 'framer-motion/dist/framer-motion';
import Insights from '../pages/Insights';
import Home from "../pages/Home";
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';

export default function AnimatedRoutes(){
  const location = useLocation();
  return (
  <AnimatePresence>
    <Stack direction="row" spacing="2" sx={{m:2}}>
    <Paper component={motion.div} drag >
      <MenuList  >
        <Link to="/" className="link"><MenuItem component="router.Link" to="/">Home</MenuItem></Link>
        <Link to="/insights" className="link"><MenuItem component="Link" to="/insights">Insights</MenuItem></Link>
      </MenuList>
    </Paper>
    </Stack>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<TodoItemsPage />} />
      <Route path="/insights" element={<Insights />} />
    </Routes>
    </AnimatePresence>  
  );
}