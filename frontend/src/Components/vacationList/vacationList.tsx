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


//import ReactPaginate from 'react-paginate';




function VacationList(): JSX.Element {
    const navigate= useNavigate();
    const[vacations,setVacation]=useState<Vacation[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(10);

    const pageCount = Math.ceil(vacations.length / 10);
    // const [page, setPage] = React.useState(1);

    //const itemsPerPage=10;
        useEffect(()=>{      
            setLoading(true);


            axios.get(`http://localhost:3003/admin/vacation/all`)
            .then(response=>setVacation(response.data));
            setLoading(false);

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
                        {/* <img className="image" src={item.vacation_img} style={{height:150}}/> */}
                        <p>{new Date(item.start_date).toISOString().slice(8,10)}/{new Date(item.start_date).toISOString().slice(5,7)}/{new Date(item.start_date).toISOString().slice(0,4)} - {new Date(item.end_date).toISOString().slice(8,10)}/{new Date(item.end_date).toISOString().slice(5,7)}/{new Date(item.end_date).toISOString().slice(0,4)}</p>
                        <p>{item.description}</p>
                        <div className="Buttons">
                            <IconButton className="btn" aria-label="delete"  color="error" size="large" onClick={()=>{
                                    axios.delete(`http://localhost:3003/admin/vacation/${item.id}`);
                                    setVacation(vacations.filter(singleVacation=>singleVacation.id !== item.id));
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
