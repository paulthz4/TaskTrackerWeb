import {React, useEffect, useState} from 'react';
import { Chart, Line, PolarArea} from 'react-chartjs-2';
import {Chart as ChartJS,RadialLinearScale,  ArcElement,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import {motion} from 'framer-motion/dist/framer-motion';
import axios from 'axios';
import { Box } from '@material-ui/core';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './pages.css'
ChartJS.register(
  RadialLinearScale, 
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BoxPlotController, 
  BoxAndWiskers,
  LinearScale,
  CategoryScale,
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

export const timeLabels = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'];

export default function Insights(){
  const [labels, setLabels] = useState([]);
  const [stoppageData, setstoppageData] = useState([]);
  
  const [lengthData, setLengthData] = useState([]);
  
  // chart 2 polar chart
  const [polarData, setPolarData] = useState([]);
  const [polarLabels, setPolarLabels] = useState([]);
  
  // box plot data
  const [boxplotData, setBoxPlotData] = useState([]);
  const [boxplotLabels, setBoxplotLabels] = useState([]);
  useEffect(()=>{
     axios.get('http://localhost:3002/').then(response=>{
      /**** use this for stoppages data chart ******
      let arr = [];
      response.data.tasks.map(i=>i.stoppage_times.map(j=>{
          let temp = [];
          temp = j.split(":");
          arr.push(parseInt(temp[0]) + (temp[1]/60))
        })); 
      *****/
      const map = new Map();
      const lengthMap = new Map();
      const polarMap = new Map();
      const boxplotMap = new Map();
      // loops through the 'tasks' array response from the axios request to make use of the data in the charts
       for(let i = 0; i < response.data.tasks.length; i++){
        // for the total number of stoppages chart. Adds the total number of stoppages in a day. Key => date_created, value=> number of stoppages
        if(map.has(response.data.tasks[i].date_created)){
          map.set(response.data.tasks[i].date_created, map.get(response.data.tasks[i].date_created) + response.data.tasks[i].stoppages);
          
        }
        else{
          map.set(response.data.tasks[i].date_created, response.data.tasks[i].stoppages);
        }
        // for the length of tasks. 
        let temp = response.data.tasks[i].total_time+"";
        temp = temp.split(" ");
        let time = 0;
        if(temp[1] === "hours" || temp[1] === "hour")
          time = parseFloat(temp[0]) + (parseFloat(temp[2])/60);
        else if( temp[1] === "minutes")
         time = (parseFloat(temp[0])/60) + (parseFloat(temp[2])/3600);
         
        if(lengthMap.has(response.data.tasks[i].date_created)){
          lengthMap.set(response.data.tasks[i].date_created, lengthMap.get(response.data.tasks[i].date_created) + time);
        }
        else 
          lengthMap.set(response.data.tasks[i].date_created, time);
          
        // box plot chart
        let sessionTime = 0;
        response.data.tasks[i].stoppage_times.map(j => {
          let temp  = j.split(":");
          sessionTime = parseFloat(temp[0]) + (parseFloat(temp[1])/60) + (parseFloat(temp[2])/3600);
          console.log("sess time", sessionTime)
       
          if(boxplotMap.has(response.data.tasks[i].task_name)){
            let arr = [];
            Array.from(boxplotMap.get(response.data.tasks[i].task_name)).map(e => arr.push(e));
            arr.push(sessionTime);
            boxplotMap.set(response.data.tasks[i].task_name, arr);
          }
          else {
            boxplotMap.set(response.data.tasks[i].task_name, [sessionTime])
          }
        });
      }
      setLabels(Array.from(map.keys()));
      setstoppageData(Array.from(map.values()));
      
      setLengthData(Array.from(lengthMap.values()));
      
      console.log("length keys", Array.from(lengthMap.keys()));
      console.log("length values", Array.from(lengthMap.values()));
      
      // chart 3 length of session times
      let arr = [];
      response.data.tasks[5].stoppage_times.map((i, index) => {
        let temp  = i.split(":");
        let sessionTime = 0;
        sessionTime = parseFloat(temp[0]) + (parseFloat(temp[1])/60) + (parseFloat(temp[2])/3600);
        if(polarMap.has(response.data.tasks[5].task_name)){
          arr = Array.from(polarMap.get(response.data.tasks[5].task_name));
          console.log("arr", arr);
          polarMap.set(response.data.tasks[5].task_name, polarMap.get(index) + sessionTime);
        }
        else
        polarMap.set(index + 1, sessionTime);
     });
     console.log(Array.from(polarMap.keys()));
     console.log(Array.from(polarMap.values()));
     
     setPolarData(Array.from(polarMap.values()));
     setPolarLabels(Array.from(polarMap.keys()));
     
     setBoxPlotData(Array.from(boxplotMap.values()));
     setBoxplotLabels(Array.from(boxplotMap.keys()));
     console.log("box plot values", Array.from(boxplotMap.values()));
     console.log("box plot labels", Array.from(boxplotMap.keys()));
     
    });

  },[]);
  const stoppageChart = {
    labels,
    datasets:[
      {  
        label: "Stoppages",
        data: stoppageData,
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
  
  const boxplotchart = {
    // define label tree
    labels: boxplotLabels,
    datasets: [
      {
        label: "Task length",
        backgroundColor: "rgba(255,0,0,0.5)",
        borderColor: "red",
        borderWidth: 1,
        outlierColor: "#999999",
        padding: 10,
        itemRadius: 3,
        data: boxplotData
      }
    ]
  };
  const chart3 = {
    labels: polarLabels,
    datasets: [
    {
      label: '# of Votes',
      data: polarData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
  };
  //console.log(datas)
  return (
  <Box component={motion.div} sx={{width:"60%"}}
    className="chart-container"
    initial={{opacity:0}}
    animate={{opacity:1, transition:{duration:1}}}
    exit={{opacity:0, transition:{duration:0.2}}}
  >
    <Box display="inline" style={{position:"relative"}}>    
      <InfoOutlinedIcon className="info-icon" fontSize="extra-small"	/>
      <Line options={{
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
            }}
      data={stoppageChart} className="chart"/>
    </Box>
    <Box display="inline" style={{position:"relative"}}>
      <InfoOutlinedIcon className="info-icon" fontSize="extra-small"	/>
      <Chart
          type="boxplot"
          data={boxplotchart}
          className="chart"
          options={{
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
          }}
        />
      </Box>  
    <Box display="inline" style={{position:"relative"}}>
      <InfoOutlinedIcon className="info-icon" fontSize="extra-small"	/>
      <PolarArea data={chart3} />
    </Box>
  </Box> 
  );
}