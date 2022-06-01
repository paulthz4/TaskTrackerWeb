import React, {useEffect, useState, useRef} from "react";
import {  Container,Button,Typography,List,LinearProgress,Divider,} from "@material-ui/core";
import '../components/App.css';
import AddIcon from "@material-ui/icons/Add";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "../components/TodoItem";
import { useDraftTodos } from "../hooks/useDraftTodos";
import { DraftTodoItem } from "../components/DraftTodoItem";
import { useShowLoader } from "../hooks/util-hooks";
import TaskItem from "../components/TaskItem";
import {useTasks} from "../hooks/useTasks_Node";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {motion} from 'framer-motion/dist/framer-motion';
import { flexbox } from "@mui/system";
export function TodoItemsPage() {
  const { loading, todos, ...todoActions } = useTodos();
  // const { tasks }  = useTasks();
  const { draftTodos, ...draftTodoActions } = useDraftTodos();
  const showLoader = useShowLoader(loading, 200);
  
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  let previousTasks = useRef([]);
  useEffect(()=>{
     async function fetch(){axios.get('http://localhost:3002/').then(response => {
      setTasks(response.data.tasks);
       console.log(response);
     });
    }
    fetch();
    console.log(tasks);
  },[]);
  
  
  
  const onSearchClick= async()=>{
    await axios.get(`http://localhost:3002/tasks?taskName=${searchText}`).then(response=>setTasks(response.data.tasks))
    //console.log(searchText)
    console.log(tasks)
  }
  
  const handleClose =()=>{
    setTasks(previousTasks.content);
  }
  
  function handleInputChange(e,v){
    //console.log(v);
  }
  
  const options = [];
  tasks.map(i => options.includes(i.task_name) ?  options : options.push(i.task_name));
  return (
    <Container component={motion.div} className="main-container"
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0, transition:{duration:0.5}}} 
      maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="todo-items-container">
        <motion.div initial={{opacity:0}} animate={{opacity:1, transition:{duration:3}}} style={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"space-around"}} >
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
          <Autocomplete
            inputValue={searchText}
            onInputChange={(e,v)=>setSearchText(v)}
            disablePortal
            onClose={(e)=>handleClose}
           // id="disable-close-on"
            options={options}
            sx={{width: "14em", height: "1em", margin: "2em"}}
            renderInput={(params) => <TextField {...params} label="Search Task" />}
          />
          <SearchIcon onClick={()=>onSearchClick()} />
          </motion.div>
          {draftTodos.map((draft) => (
              <DraftTodoItem
                key={String(draft._id)}
                todo={draft}
                todoActions={todoActions}
                draftTodoActions={draftTodoActions}
              />
            ))}
          <List style={{ width: "100%" }} dense={true}>
            {
              tasks.map((task) =>(
              <TaskItem key={task._id} task={task} />
              ))
            }
            <br/><Divider/><br/><br/>
            {todos.map((todo) => (
              <TodoItem
                key={String(todo._id)}
                todo={todo}
                todoActions={todoActions}
              />
            ))}
            
          </List>
        </div>
      )}
      {/* <MoreInfo /> */}
    </Container>
  );
}
