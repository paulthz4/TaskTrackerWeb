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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Task Insights in Stoppage times',
    },
  },
};

const labels = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'];

export const datas = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,5,6,4,5,6,4],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
   
  ],
};
export default function Insights(){
  const [labels, setLabels] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const dataSet = {
    labels,
    datasets:[
      {  
        label: "stoppages",
        data: metaData,
        borderColor: 'rgb(102, 102, 255)',
        backgroundColor: 'rgba(128, 128, 255, 0.5)',
      }
    ]
  };
  useEffect(()=>{
    axios.get('http://localhost:3002/').then(response=>{
      let arr = [];
      let labels = []
      // ***** use this for stoppages data chart ******
      // response.data.tasks.map(i=>i.stoppage_times.map(j=>{
      //     let temp = [];
      //     temp = j.split(":");
      //     arr.push(parseInt(temp[0]) + (temp[1]/60))
      //   })); 
      response.data.tasks.map(i=>{
        arr.push(i.stoppages);
        labels.push(i.date_created)
      });
      setLabels(labels);
      setMetaData(arr);
      console.log(metaData);
      console.log(arr);
    });
    
  },[]);
  return (
  <Box component={motion.div}
    className="chart"
    initial={{opacity:0}}
    animate={{opacity:1, transition:{duration:1}}}
    exit={{opacity:0, transition:{duration:0.2}}}
  >
    <Line options={options} data={dataSet}/>
  </Box> 
  );
}