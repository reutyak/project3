import { IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Vacation from "../../Models/Vacation";
import "./vacationList.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router";
import React from "react";
import { Pagination } from "@mui/material";
import { store } from "../redux/store";
import { VacationState, deleteVacationSt, getAllVacationSt, vacationActionType } from "../redux/vacationState";


//import ReactPaginate from 'react-paginate';




function VacationList(): JSX.Element {
    const navigate= useNavigate();
    const[vacations,setVacations]=useState<Vacation[]>(store.getState().vacationState.vacationsSt);
    // const [loading, setLoading] = useState(false);
    store.subscribe(()=>{
        setVacations(store.getState().vacationState.vacationsSt);
        console.log("subscribe");
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(10);

    const pageCount = Math.ceil(vacations.length / 10);
    // const [page, setPage] = React.useState(1);

    // useEffect(()=>{
    //     localStorage.setItem('vacations', JSON.stringify(vacations));
    // },[vacations]);
    
    useEffect(()=>{
        setVacations(store.getState().vacationState.vacationsSt);
        },[]);

    //const itemsPerPage=10;
        useEffect(()=>{      
            // setLoading(true);
            // let storageVacation = JSON.parse(localStorage.vacations);
            // console.log(storageVacation.length);
            // if(storageVacation.length > 0){
            //  setVacations(storageVacation);
            if(vacations.length>0){return
            }else{
                console.log("000");
                axios.get(`http://localhost:3003/admin/vacation/all`)
                .then(response=>{
                    // setVacations(response.data);
                    store.dispatch(getAllVacationSt(response.data));
                    // setVacations(store.getState().vacationReducer.vacations);
                });
                console.log("123");
                console.log(vacations);
            }
            // setLoading(false);
        },[currentPage]);



        const sortedVacations=vacations.sort((objA,objB)=>new Date(objB.start_date).getTime()-new Date(objA.start_date).getTime());
        // Get currCards
        const indexOfLastCard = currentPage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        const currentCards = sortedVacations.slice(indexOfFirstCard, indexOfLastCard);

        // Change page
        const paginate = (pageNumber:any) => setCurrentPage(pageNumber);
        // console.log(cardsPerPage, movieCard.length, paginate);

        const handleChange = (event:any, value:any) => {
            setCurrentPage(value);
        };




    return (
        <div className="vacationList">
            <div className="displayCard">
                <div className="card">
                {currentCards.map((item)=>
                    <div className="card-container" key={item.id} style={{ height: 360, width:250 }}>
                        <p>{item.destination}</p>
                        <p>{item.price}&#36;</p>
                        <img className="image" src={item.vacation_img} style={{height:150}}/>
                        <p>{new Date(item.start_date).toISOString().slice(8,10)}/{new Date(item.start_date).toISOString().slice(5,7)}/{new Date(item.start_date).toISOString().slice(0,4)} - {new Date(item.end_date).toISOString().slice(8,10)}/{new Date(item.end_date).toISOString().slice(5,7)}/{new Date(item.end_date).toISOString().slice(0,4)}</p>
                        <p>{item.description}</p>
                        <div className="Buttons">
                            <IconButton className="btn" aria-label="delete"  color="error" size="large" onClick={()=>{
                                    axios.delete(`http://localhost:3003/admin/vacation/${item.id}`);
                                    // setVacations(vacations.filter(singleVacation=>singleVacation.id !== item.id));
                                    store.dispatch(deleteVacationSt(item.id));
                                }}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton className="btn" aria-label="edit" color="success" onClick={() => {
                                    navigate(`/admin/addVacation/${item.id}`);
                                }}>
                                <EditIcon/>
                            </IconButton>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <Pagination count={pageCount} page={currentPage} onChange={handleChange} />


        </div>

    );
}

export default VacationList;
