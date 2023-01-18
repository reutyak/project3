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
  VacationState,
  deleteVacationSt,
  getAllVacationSt,
  vacationActionType,
} from "../redux/vacationState";
import User from "../../Models/User";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuUser from "../MenuUser/MenuUser";

function UserVacationList(): JSX.Element {
  // var hash = require('object-hash');

  const myCurrentToken = localStorage.getItem("myToken");
  axios.defaults.headers.common = { Authorization: myCurrentToken };
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [vacations, setVacations] = useState<Vacation[]>(
    store.getState().vacationState.vacationsSt
  );
  // const [loading, setLoading] = useState(false);
  store.subscribe(() => {
    setVacations(store.getState().vacationState.vacationsSt);
    console.log("subscribe");
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  const [currentUser, setUser] = useState<User>();

  class forLikedPosts {
    id: number = 0;
    description: string | undefined;
    destination: string | undefined;
    price: number | undefined;
    vacation_img: any = "";
    start_date: Date = new Date();
    end_date: Date = new Date();
    amountOfFollowers: number = 0;
    isLiked: boolean = false;
  }
  const userVacationsList: forLikedPosts[] = [];

  // const [page, setPage] = React.useState(1);

  // useEffect(()=>{
  //     localStorage.setItem('vacations', JSON.stringify(vacations));
  // },[vacations]);
  const myUserName: any =
    localStorage.getItem("id") !== null &&
    localStorage.getItem("id") !== undefined
      ? localStorage.getItem("id")
      : 0;
  console.log(+myUserName);
  useEffect(() => {
    setVacations(store.getState().vacationState.vacationsSt);
  }, []);

  //const itemsPerPage=10;
  useEffect(() => {
    // setLoading(true);
    // let storageVacation = JSON.parse(localStorage.vacations);
    // console.log(storageVacation.length);
    // if(storageVacation.length > 0){
    //  setVacations(storageVacation);

    if (vacations.length > 0) {
      console.log(vacations.length);
    } else {
      console.log("000");
      axios.get(`http://localhost:3003/admin/vacation/all`).then((response) => {
        // setVacations(response.data);
        store.dispatch(getAllVacationSt(response.data));
        // setVacations(store.getState().vacationReducer.vacations);
      });
      console.log("123");
      console.log(vacations);
    }
    // axios.get(`http://localhost:3003/user/all`)
    // .then(response=>{
    //     setUsers(response.data);})
    axios
      .get(`http://localhost:3003/user/single/${+myUserName}`)
      .then((response) => setUser(response.data[0]));
    // setLoading(false);
  }, [currentPage]);

  // users.map(item=>{

  //     if(hash(myUserName)===item.user_name){
  //         setUser(item);
  //         console.log(currentUser);
  //     }else{
  //         console.log("faild")
  //     }
  // })
  let myFollowed = currentUser?.followed_list ? currentUser?.followed_list : [];
  console.log(currentUser?.followed_list);
  const pageCount = Math.ceil(vacations.length / 10);
  vacations.map((item) => {
    let templist = new forLikedPosts();
    templist.id = item.id;
    templist.description = item.description;
    templist.destination = item.destination;
    templist.price = item.price;
    templist.vacation_img = item.vacation_img;
    templist.start_date = item.start_date;
    templist.end_date = item.end_date;
    templist.amountOfFollowers = item.amountOfFollowers;
    for (let i = 0; i < myFollowed.length; i++) {
      if (item.id === +myFollowed[i]) {
        templist.isLiked = true;
      }
    }
    // myFollowed.map((like)=>{
    //     if(item.id===+like){
    //         templist.isLiked=true;
    //     }
    //     else{console.log(like)}
    // })
    userVacationsList.push(templist);
  });
  console.log(userVacationsList);
  const sortedVacations = userVacationsList.sort(
    (objA, objB) =>
      new Date(objB.start_date).getTime() - new Date(objA.start_date).getTime()
  );
  // Get currCards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  let currentCards = sortedVacations.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  // console.log(cardsPerPage, movieCard.length, paginate);

  const handleChange = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const handleLikeClick = (postId: number) => {
    let myLike = false;
    currentCards.map((post) => {
      if (post.id === postId) {
        post.isLiked = !post.isLiked;
        post.amountOfFollowers = post.isLiked
          ? post.amountOfFollowers - 1
          : post.amountOfFollowers + 1;
        console.log(post.amountOfFollowers, post.isLiked);
        myLike = post.isLiked;
        // return {
        //   ...post,
        //   isLiked: !post.isLiked,
        //   likeCount: post.isLiked ? post.amountOfFollowers-1 : post.amountOfFollowers+1
        // }
      }
      myLike = post.isLiked;
    });
    return myLike;
    // currentCards=updatedPosts;
    // return isLiked;
    // userVacationsList.setState({ posts: updatedPosts });
  };

  return (
    <>
      <div className="UserVacationList">
        <div className="displayCard">
          <div className="card">
            {currentCards.map((item) => (
              <div
                className="card-container"
                key={item.id}
                style={{ height: 360, width: 250 }}
              >
                <p>{item.destination}</p>
                <p>{item.price}&#36;</p>
                <img
                  className="image"
                  src={item.vacation_img}
                  style={{ height: 150 }}
                />
                <p>
                  {new Date(item.start_date).toISOString().slice(8, 10)}/
                  {new Date(item.start_date).toISOString().slice(5, 7)}/
                  {new Date(item.start_date).toISOString().slice(0, 4)} -{" "}
                  {new Date(item.end_date).toISOString().slice(8, 10)}/
                  {new Date(item.end_date).toISOString().slice(5, 7)}/
                  {new Date(item.end_date).toISOString().slice(0, 4)}
                </p>
                <p>{item.description}</p>
                <div className="Buttons">
                  <IconButton
                    className="btn"
                    aria-label="edit"
                    color="success"
                    onClick={() => (item.isLiked = handleLikeClick(item.id))}
                  >
                    {item.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  {item.amountOfFollowers}
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
      <MenuUser></MenuUser>
    </>
  );
}

export default UserVacationList;
