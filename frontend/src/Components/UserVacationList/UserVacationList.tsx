/* eslint-disable jsx-a11y/alt-text */
import "./UserVacationList.css";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Vacation from "../../Models/Vacation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router";
import React from "react";
import { Pagination } from "@mui/material";
import { store } from "../redux/store";
import {
  addVacationSt,
  deleteVacationSt,
  getAllVacationSt,
} from "../redux/vacationState";
import User from "../../Models/User";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuUser from "../MenuUser/MenuUser";
import Switch from "@mui/material/Switch";
import ModalAuth from "../modalAuth/modalAuth";
import VacationFollow from "../../Models/vacationToUpdateFollow";

function UserVacationList(): JSX.Element {

  const myCurrentToken = localStorage.getItem("myToken");
  axios.defaults.headers.common = { Authorization: myCurrentToken };
  const navigate = useNavigate();
  let myTempArr: Array<any> = [];
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [currentUser, setUser] = useState<User>(new User());
  const [button,setButton] = useState<boolean>(false);
  const [renderMe,setRender]=useState<boolean>(false);
  const [vacations, setVacations] = useState<Vacation[]>(
    store.getState().vacationState.vacationsSt
  );
  store.subscribe(() => {
    setVacations(store.getState().vacationState.vacationsSt);
    console.log("subscribe");
  });
  
  const myUserName: any =
    localStorage.getItem("id") !== null &&
    localStorage.getItem("id") !== undefined
      ? localStorage.getItem("id")
      : 0;
  console.log(+myUserName);

  useEffect(() => {
    setVacations(store.getState().vacationState.vacationsSt);
  }, []);

  useEffect(() => {
    if (vacations.length > 0) {
      console.log(vacations.length);
    } else {
      console.log("000");
      axios.get(`http://localhost:3003/admin/vacation/all`).then((response) => {
        store.dispatch(getAllVacationSt(response.data));
        console.log(response.data);
        setVacations(response.data);
      });
    }
    try{
    axios
      .get(`http://localhost:3003/user/single/${+myUserName}`)
      .then((response) => setUser(response.data[0]));
    console.log(User);
  }catch(err: any) {
    if(err.message=="Request failed with status code 401"){setModalShow(true)}
    console.log(err.message);
}
  }, [currentPage]);

  const pageCount = Math.ceil(vacations.length / 10);
  const modalUp=()=>{
    if(modalShow===true){
            return <ModalAuth show={modalShow} onHide={() => {setModalShow(false);navigate("/")}} />
    }     
};
  const sortedVacations = vacations.sort(
    (objA, objB) =>
      new Date(objB.start_date).getTime() - new Date(objA.start_date).getTime()
  );
  // Get currCards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  let currentCards = sortedVacations.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const handleChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const changeIcon = async (item: Vacation) => {
    setButton(true);
    currentUser.followed_list =
      currentUser?.followed_list.length > 0
        ? currentUser?.followed_list.substring(
            0,
            currentUser?.followed_list.length - 1
          )
        : "";

    let myFollowed =
      currentUser?.followed_list.length > 1
        ? currentUser?.followed_list.split(",")
        : currentUser.followed_list;
    console.log(myFollowed);
    myTempArr = [];
    for (let n = 0; n < myFollowed.length; n += 1) {
      myTempArr.push(+myFollowed[n]);
    }
    console.log(myTempArr);
    let upDateUser = new User();
    upDateUser.id = currentUser?.id || 0;
    upDateUser.name = currentUser?.name || "";
    upDateUser.last_name = currentUser?.last_name || "";
    upDateUser.user_name = currentUser?.user_name || "";
    upDateUser.password = currentUser?.password || "";
    console.log(currentUser?.followed_list);
    upDateUser.followed_list =
      currentUser?.followed_list.length > 0
        ? currentUser?.followed_list + ","
        : "";
    console.log(upDateUser.followed_list);
    console.log(myTempArr);
    let temp = myTempArr.filter((number: any) => number === item.id);
    console.log(temp);
    if (temp.length > 0) {
      console.log("exist");
      myTempArr = myTempArr.filter((number: any) => number !== item.id);
      console.log(myTempArr);
      upDateUser.followed_list = "";
      for (let i = 0; i < myTempArr.length; i += 1) {
        upDateUser.followed_list += myTempArr[i] + ",";
      }
      currentUser.followed_list = upDateUser.followed_list;
      setUser(upDateUser);
    } else {
      console.log("not exist");
      myTempArr.push(item.id);
      upDateUser.followed_list = upDateUser.followed_list + item.id + ",";
      currentUser.followed_list = upDateUser.followed_list;
      setUser(upDateUser);
    }

    console.log(currentUser);
    try{
    await axios
      .put(`http://localhost:3003/user/update`, currentUser)
      .then((response) => console.log(response.data[0]))
      .then(() => handleLikeClick(item));
      console.log("what to do");
    }catch(err: any) {
      console.log("catch");

      if(err.message=="Request failed with status code 401"){setModalShow(true)}
      console.log(err.message);
  }
  setTimeout(()=>setButton(false), 2000)
  };

  const HeaderIcon = (item: Vacation)=> {
    // setRender(!renderMe);
    return (
      <><div>
        {currentUser.followed_list.includes(item.id) ? (
          <FavoriteIcon></FavoriteIcon>
        ) : (
          <FavoriteBorderIcon></FavoriteBorderIcon>
        )}
      </div><span>{item.amountOfFollowers}</span></>
    );
  }

  const handleLikeClick = async (card: VacationFollow) => {
    console.log(card);
    let updateVacation = new VacationFollow();
    updateVacation.id = card.id;
    updateVacation.amountOfFollowers = currentUser.followed_list.includes(
      card.id
    )
      ? (card.amountOfFollowers += 1)
      : (card.amountOfFollowers -= 1);
      try{
    await axios
      .put(`http://localhost:3003/admin/vacation/updateFollow`, updateVacation)
      .then((res) => {
        const addProduct = res.data;
        console.log(store.getState().vacationState.vacationsSt);
        const currentToken = res.headers["authorization"];
        localStorage.setItem("myToken", currentToken || "");
        store.dispatch(deleteVacationSt(updateVacation.id));
        console.log(store.getState().vacationState.vacationsSt);
        store.dispatch(addVacationSt(addProduct));
        setVacations(store.getState().vacationState.vacationsSt);
      })}catch(err: any) {
        console.log("catch");
  
        if(err.message=="Request failed with status code 401"){setModalShow(true)}
        console.log(err.message);
    };
    
    await axios.get(`http://localhost:3003/admin/vacation/all`).then((response) => {
      store.dispatch(getAllVacationSt(response.data));
    });
  };

  const [checked, setChecked] = useState(false);
  
  return (
    <>
      <div className="UserVacationList">
      <div>{modalUp()}</div>
        <Switch
          checked={checked}
          onChange={(args) => {
            setChecked(args.target.checked);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <span>wishlist</span>
        <MenuUser></MenuUser>
        <div className="displayCard">
          <div className="card">
            {currentCards.map((item) => (
              <div
                className="card-container"
                key={item.id}
                style={{
                  height: 360,
                  width: 250,
                  display: checked
                    ? currentUser.followed_list.includes(item.id)
                      ? "block"
                      : "none"
                    : "block",
                }}
              >
                <p>{item.destination}</p>
                <p>{item.price}&#36;</p>
                <img
                  className="image"
                  src={item.vacation_img}
                  style={{ height: 150 }}
                />
                <p>
                  {new Date(item.start_date).getDate()}/
                  {new Date(item.start_date).toISOString().slice(5, 7)}/
                  {new Date(item.start_date).toISOString().slice(0, 4)} -{" "}
                  {new Date(item.end_date).getDate()}/
                  {new Date(item.end_date).toISOString().slice(5, 7)}/
                  {new Date(item.end_date).toISOString().slice(0, 4)}
                </p>
                <p>{item.description}</p>
                <div className="Buttons">
                  <IconButton
                    className="btn"
                    aria-label="edit"
                    color="success"
                    disabled = {button}
                    onClick={() => changeIcon(item)}
                  >
                    {HeaderIcon(item)}
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default UserVacationList;
