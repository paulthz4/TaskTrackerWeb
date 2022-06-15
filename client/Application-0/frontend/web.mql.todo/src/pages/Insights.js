import {React, useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import {motion} from 'framer-motion/dist/framer-motion';
import axios from 'axios';
import { Box } from '@material-ui/core';
import './pages.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Tasks Insights ',
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Total Length of Tasks per Day',
    },
  },
};

export const timeLabels = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'];

export const example = {
  timeLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,5,6,4,5,6,4.5,6,8,5],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
   
  ],
};
export default function Insights(){
  const [labels, setLabels] = useState([]);
  const [metaData, setMetaData] = useState([]);
  
  const [lengthData, setLengthData] = useState([]);
  const [lengthLabels, setLengthLabels] = useState([]);
  
  useEffect(()=>{
    async function get(){await axios.get('http://localhost:3002/').then(response=>{
      /**** use this for stoppages data chart ******
      let arr = [];
      response.data.tasks.map(i=>i.stoppage_times.map(j=>{
          let temp = [];
          temp = j.split(":");
          arr.push(parseInt(temp[0]) + (temp[1]/60))
        })); 
      *****/
      const stoppageMap = new Map();
      const lengthMap = new Map();
      
      // loops through the 'tasks' array response from the axios request to make use of the data in the charts
       for(let i = 0; i < response.data.tasks.length; i++){
        // for the total number of stoppages chart. Adds the total number of stoppages in a day. Key => date_created, value=> number of stoppages
        if(stoppageMap.has(response.data.tasks[i].date_created))
        stoppageMap.set(response.data.tasks[i].date_created, stoppageMap.get(response.data.tasks[i].date_created) + response.data.tasks[i].stoppages);
        else
        stoppageMap.set(response.data.tasks[i].date_created, response.data.tasks[i].stoppages);
        
        // for the length of tasks in a day chart. 
        let temp = response.data.tasks[i].total_time+"";
        temp = temp.split(" ");
        let time = 0;
        if(temp[1] === "hours" || temp[1] === "hour")
          time = parseFloat(temp[0]) + (parseFloat(temp[2])/60);
        else if( temp[1] === "minutes")
         time = (parseFloat(temp[0])/60) + (parseFloat(temp[2])/3600);
         
        if(lengthMap.has(response.data.tasks[i].date_created)){
          lengthMap.set(response.data.tasks[i].date_created, parseFloat(lengthMap.get(response.data.tasks[i].date_created)) + parseFloat(time));
        }
        else 
          lengthMap.set(response.data.tasks[i].date_created, parseFloat(time));
      }
      setLabels(Array.from(stoppageMap.keys()));
      setMetaData(Array.from(stoppageMap.values()));
      
      setLengthLabels(Array.from(lengthMap.keys()));
      setLengthData(Array.from(lengthMap.values()));
      
      console.log("length keys", Array.from(lengthMap.keys()));
      console.log("length values", Array.from(lengthMap.values()));

      // console.log("labels array",Array.from(stoppageMap.keys()));
      // console.log("data array",Array.from(stoppageMap.values()));
    });
  }
  get();
  },[]);
  const stoppageData = {
    labels,
    datasets:[
      {  
        label: "Stoppages",
        data: metaData,
        borderColor: 'rgb(102, 102, 255)',
        backgroundColor: 'rgba(128, 128, 255, 0.5)',
      },
      {  
        label: "Task length",
        data: lengthData,
        borderColor: 'rgb(26, 255, 140)',
        backgroundColor: 'rgba(26, 255, 140, 0.5)',
      }
    ]
  };
  
  const lengthChartData = {
    labels:lengthLabels,
    datasets:[
      {  
        label: "Task length",
        data: lengthData,
        borderColor: 'rgb(26, 255, 140)',
        backgroundColor: 'rgba(26, 255, 140, 0.5)',
      }
    ]
  };
  //console.log(datas)
  return (
  <Box component={motion.div}
    className="chart"
    initial={{opacity:0}}
    animate={{opacity:1, transition:{duration:1}}}
    exit={{opacity:0, transition:{duration:0.2}}}
  >
    <Line options={options1} data={stoppageData}/>
    <Line options={options2} data={lengthChartData}  />
  </Box> 
  );
}