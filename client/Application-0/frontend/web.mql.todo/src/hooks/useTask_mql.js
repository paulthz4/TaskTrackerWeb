import { useEffect, useState } from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";
// import {
//   addValueAtIndex,
//   replaceValueAtIndex,
//   updateValueAtIndex,
//   removeValueAtIndex,
//   getTodoIndex,
// } from "../utils";

export function useTasks(){
  const realmApp = useRealmApp();
  const [tasks, setTasks] = useState([]);
  // const [loading, setLoading] = useState(true);
  
  const taskCollection = useCollection({
    cluster: 'mongodb-atlas',
    db: "all_tasks",
    collection: "tasks"
  });
  
  useEffect(()=>{
    taskCollection.find({}).then((fetchedTasks) => {
      setTasks(fetchedTasks);
      // setLoading(false);
    });
  },[taskCollection]);
  
  return {
    // loading, 
    tasks
  };
}