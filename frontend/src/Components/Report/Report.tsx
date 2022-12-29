import MenuAdmin from "../MenuAdmin/MenuAdmin";
import "./Report.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Vacation from "../../Models/Vacation";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



function Report(): JSX.Element {
    
    const [vacations, setVacations]=useState<Vacation[]>([]);

    useEffect(()=>{
        let storageVacation = JSON.parse(localStorage.vacations);
        console.log(storageVacation.length);
        if(storageVacation.length > 0)
        {
            setVacations(storageVacation);
        }else{
            axios.get(`http://localhost:3003/admin/vacation/all`)
            .then(response=>setVacations(response.data));
            console.log("123");
            console.log(vacations);
        }
        // axios.get("http://localhost:3003/admin/vacation/all")
        // .then(response=>setVacations(response.data));
        
    },[])
    
    const names=new Array<string>();
    const followers=new Array<number>();
    

    vacations.map(item => {
        if(item.amountOfFollowers>0)
            names.push(item.destination?item.destination:"");
            followers.push(item.amountOfFollowers);
            
    })
    console.log(names);
    console.log(followers);
    const data = {
    labels: names,
    
    datasets: [{
        label: "Followers for Vacation",
        data: followers,
        
        backgroundColor: [
        'rgb(153, 102, 255)'
        ],
        borderColor: [
        'rgb(153, 102, 255)'
        ],
        borderWidth: 1
    }]}
    
    return (
        <div className="Report">
            <header><MenuAdmin/></header>
            <main><h2>Report</h2></main>
            <Bar className="bar"  data={data} />
            
    </div>
    
    );
}

export default Report;

