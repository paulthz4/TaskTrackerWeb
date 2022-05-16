import Axios from 'axios';
import { useState } from 'react';

export async function useTasks(){
  const [tasks, setTasks] = useState([]);
  await Axios.get('http://localhost:3002/').then((response) =>{ setTasks(values => response.data.tasks)});
  // console.log(tasks[0]);
  return tasks;
}