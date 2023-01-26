import { IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Vacation from "../../Models/Vacation";
import "./vacationList.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import React from "react";
import { Pagination } from "@mui/material";
import { store } from "../redux/store";
import { VacationState, deleteVacationSt, getAllVacationSt } from "../redux/vacationState";
import ModalAuth from "../modalAuth/modalAuth";

function VacationList(): JSX.Element {
    const myCurrentToken = localStorage.getItem("myToken");
    axios.defaults.headers.common = {'Authorization': myCurrentToken}
    const navigate= useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const[vacations,setVacations]=useState<Vacation[]>(store.getState().vacationState.vacationsSt);
    store.subscribe(()=>{
        setVacations(store.getState().vacationState.vacationsSt);
        console.log("subscribe");
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(10);

    const pageCount = Math.ceil(vacations.length / 10);
    
    useEffect(()=>{
        setVacations(store.getState().vacationState.vacationsSt);
        },[]);

        useEffect(()=>{      
            if(vacations.length>0){console.log(vacations.length)
            }else{
                console.log("000");
                axios.get(`http://localhost:3003/admin/vacation/all`)
                .then(response=>{
                    store.dispatch(getAllVacationSt(response.data));
                });
                console.log("123");
                console.log(vacations);
            }
        },[currentPage]);



        const sortedVacations=vacations.sort((objA,objB)=>new Date(objB.start_date).getTime()-new Date(objA.start_date).getTime());
        // Get currCards
        const indexOfLastCard = currentPage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        const currentCards = sortedVacations.slice(indexOfFirstCard, indexOfLastCard);

        // Change page
        const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

        const handleChange = (event:any, value:any) => {
            setCurrentPage(value);
        };

        const modalUp=()=>{
            if(modalShow===true){
                    return <ModalAuth show={modalShow} onHide={() => {setModalShow(false);navigate("/")}} />
            }     
        };


    return (
        <div className="vacationList">
            <div>{modalUp()}</div>
            <div className="displayCard">
                <div className="card">
                {currentCards.map((item)=>
                    <div className="card-container" key={item.id} style={{ height: 360, width:250 }}>
                        <p className="dest">{item.destination}</p>
                        <p>{item.price}&#36;</p>
                        <img className="image" src={item.vacation_img} style={{height:150}}/>
                        <p>{new Date(item.start_date).getDate()}/{new Date(item.start_date).toISOString().slice(5,7)}/{new Date(item.start_date).toISOString().slice(0,4)} - {new Date(item.end_date).getDate()}/{new Date(item.end_date).toISOString().slice(5,7)}/{new Date(item.end_date).toISOString().slice(0,4)}</p>
                        <p>{item.description}</p>
                        <div className="Buttons">
                        <IconButton className="btn" aria-label="delete"  color="error" size="large" onClick={async ()=>{
                                try{
                                    await axios.delete(`http://localhost:3003/admin/vacation/${item.id}`).then(
                                        res=>{
                                            console.log(res.headers["authorization"]);
                                            const currentToken = res.headers["authorization"];
                                            localStorage.setItem("myToken", currentToken||"");
                                        }
                                    )
                                    .then(res=>{store.dispatch(deleteVacationSt(item.id))})
                            } catch (err: any) {
                                if(err.message=="Request failed with status code 401"){setModalShow(true)}
                                console.log(err.message);
                            }
                            }}><DeleteIcon/>
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
