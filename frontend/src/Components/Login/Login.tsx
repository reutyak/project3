import react from "react";
import  SvgIcon, { Alert, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Admin from "../../Models/Admin";
import { LoginModel } from "../../Models/loginModel";
import User from "../../Models/User";
import "./Login.css";
import { useState } from "react";
import { useEffect } from "react";
import { store } from "../redux/store";




function Login(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [admin, setAdmin] = useState<Admin[]>([]);
    const {register, handleSubmit} = useForm<LoginModel>();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<Boolean>(false);
    var hash = require('object-hash');
    const alertOn = ()=>{
        if (alert === true){
            return <Alert variant="outlined" severity="error">One of the details you entered is incorrect</Alert>
        }
    };

    const usersMap = (user_name:string,password:string) => {
        let response = false;
        users.map((user: { user_name: string; password: string; }) => {if (hash(user_name)===user.user_name && hash(password)===user.password){response = true}
        else{setAlert(true)}});
        return response
    };
       
    useEffect(()=>{
        localStorage.setItem('myToken', "");
        localStorage.setItem('id', "");

    },[]);

    useEffect(()=>{
        axios.get("http://localhost:3003/admin/all")
        .then(response => response.data.length ===0?navigate("/modal"): setAdmin(response.data))
        axios.get("http://localhost:3003/user/all")
        .then(response => setUsers(response.data))
    },[]);

const send =  async (userLogin: LoginModel) => {
        try {
                if(userLogin.typeUser === "admin"){
                axios.post("http://localhost:3003/admin/login", userLogin)
                    .then(response=>{
                        console.log(response.headers["authorization"]);
                        const currentToken = response.headers["authorization"];
                        localStorage.setItem("myToken", currentToken||"");
                        console.log(response.data);
                        response.data?navigate("/admin"):navigate("/");
                    })
                }
                if (userLogin.typeUser === "user" ){
                    await axios.post("http://localhost:3003/user/login", userLogin)
                    .then(response=>{
                        if (response.status===403){setAlert(true)}else{
                        console.log(response.headers["authorization"]);
                        const currentToken = response.headers["authorization"];
                        localStorage.setItem("myToken", currentToken||"");
                        localStorage.setItem("id",response.data);
                        console.log(response.data);
                        response.data?navigate("/user"):navigate("/");}})
                }else{
                    setAlert(true);
                }
        } catch (err: any) {
            console.log(err.message);
            setAlert(true);
        }
    }
    return (
                
<div className="Login">
        <form className="login" onSubmit={handleSubmit(send)}>
        <div className="form container">
            <h4 className="head">Login</h4>
            <div className = "Alert">{alertOn()}</div>
            <label>Select a user type:</label>
            <select className="form-control" required {...register("typeUser")}>
                <option>admin</option>
                <option>user</option>
            </select>
            <label htmlFor="sel">Enter User Name:</label>
            <input  className="form-control" id="sel" type="text" required {...register("user_name")}></input>
            <label>Enter Password:</label>
            <input  className="form-control" type="password" required {...register("password")}></input>
            <input  className="btn btn-primary" required type="submit" value="Entrance"/>
            <br />
            <p>Don't have an account yet?&nbsp;&nbsp;<NavLink to="/register"><span> Register&nbsp;</span></NavLink></p>
            </div>
        </form>
    </div>
    );
}

export default Login;
