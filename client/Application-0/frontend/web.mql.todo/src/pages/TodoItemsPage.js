import React, {useEffect, useState} from "react";
import {  Container,Button,Typography,List,LinearProgress,Divider, Box, Input, Menu,} from "@material-ui/core";
import '../components/App.css';
import AddIcon from "@material-ui/icons/Add";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "../components/TodoItem";
import { useDraftTodos } from "../hooks/useDraftTodos";
import { DraftTodoItem } from "../components/DraftTodoItem";
import { useShowLoader } from "../hooks/util-hooks";
import TaskItem from "../components/TaskItem";
import TaskTracker from "../components/TaskTracker";
import axios from "axios";
import { Autocomplete, TextField, Stack, Pagination, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {motion} from 'framer-motion/dist/framer-motion';
import usePagination from "../hooks/usePagination";

export function TodoItemsPage() {
  const { loading, todos, ...todoActions } = useTodos();
  const { draftTodos, ...draftTodoActions } = useDraftTodos();
  const showLoader = useShowLoader(loading, 200);
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const count = Math.ceil(tasks.length / itemsPerPage );
  const DATA = usePagination(tasks, itemsPerPage);
  
  const handleChange=(e,p)=>{
    setPage(p);
    DATA.jump(p);
  }
  
  useEffect(()=>{
      axios.get('http://localhost:3002/').then(response => {
      setTasks(response.data.tasks);
      const array = [];
      response.data.tasks.map(i => array.includes(i.task_name) ?  array : array.push(i.task_name));
      setOptions(array);
       console.log(response,"options text");
     });    
    //console.log(tasks, "tasks");
  },[]);
  
  
  const onSearchClick= async()=>{
    await axios.get(`http://localhost:3002/tasks?taskName=${searchText}`).then(response=>setTasks(response.data.tasks))
    //console.log(searchText)
    console.log(tasks)
  }
  
  return (
    <Container component={motion.div} className="main-container"
      initial={{opacity:0}}
      animate={{opacity:1, transition:{duration:0.6}}}
      exit={{opacity:0, transition:{duration:0.2}}} 
      maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="todo-items-container">
          <Typography component="p" variant="h5">
            {`You have ${tasks.length} Task${
              tasks.length === 1 ? "" : "s"
            }`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => draftTodoActions.createDraftTodo()}
          >
            Add Task
          </Button>
          <div style={{display:"flex", alignItems:"center"}}>
          <Autocomplete
            inputValue={searchText}
            onInputChange={(e,v)=>setSearchText(v)}
            disablePortal
            id="combo-box"
            //onChange={(e,v)=>handleChange(e,v)}
            options={options}
            sx={{ width:"15em", px:3}}
            renderInput={(params) => <TextField {...params} label="Search Task" />}
          />
          <SearchIcon onClick={()=>onSearchClick()} />
          </div>
          {draftTodos.map((draft) => (
              <DraftTodoItem
                key={String(draft._id)}
                todo={draft}
                todoActions={todoActions}
                draftTodoActions={draftTodoActions}
              />
            ))}
          <Stack>
            <Pagination 
              count={count} 
              size="medium"
              page={page}
              onChange={handleChange}
            />
          </Stack>  
          <FormControl sx={{ m: 1, width: "20%" }} size="small">
            <InputLabel>Tasks per Page</InputLabel>
            <Select 
              value={itemsPerPage}
              label="itemsPerPage"
              onChange={(e)=>{setItemsPerPage(e.target.value)}}
            >
            <MenuItem value={Math.ceil(tasks.length/5)}>{Math.ceil(tasks.length/5)}</MenuItem>
            <MenuItem value={Math.ceil(tasks.length/4)}>{Math.ceil(tasks.length/4)}</MenuItem>
            <MenuItem value={Math.ceil(tasks.length/3)}>{Math.ceil(tasks.length/3)}</MenuItem>
            </Select>
          </FormControl>
          <List style={{ width: "100%" }} dense={true}>
            {
              DATA.currentData().map((task) =>(
              <TaskItem key={task._id} task={task} />
              ))
            }
            <br/><Divider/><br/><br/>
            {/* {todos.map((todo) => (
              <TodoItem
                key={String(todo._id)}
                todo={todo}
                todoActions={todoActions}
              />
            ))} */}
            
          </List>
        </div>
      )}
      {/* <MoreInfo /> */}
    </Container>
  );
}
