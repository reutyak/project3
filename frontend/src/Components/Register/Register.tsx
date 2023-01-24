import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Admin from "../../Models/Admin";
import { LoginModel } from "../../Models/loginModel";
import User from "../../Models/User";
import Modal from "../Modal/Modal";
import "./Register.css";

function Register(): JSX.Element {
    var hash = require('object-hash');
    const [users, setUsers] = useState<User[]>([]);
    const [admin, setAdmin] = useState<Admin[]>([]);
    const {register, handleSubmit} = useForm<User>();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<Boolean>(false);
    const alertOn = ()=>{
        if (alert === true){
            return <Alert variant="outlined" severity="error">The username you selected already exists in the system</Alert>
        }
    };
    
    const usersMap = (user_name:string) => {
        let response = false;
        users.map((user: { user_name: string; }) => {hash(user_name)===user.user_name?response=true:response = false});
        if(response == false) {admin[0].admin_name === hash(user_name)?response=true:response = false;}
        return response
    };
        

    useEffect(()=>{
        axios.get("http://localhost:3003/admin/all")
        .then(response => setAdmin(response.data))
        axios.get("http://localhost:3003/user/all")
        .then(response => setUsers(response.data))
    },[]);

const send =  async (user: User) => {
        try {
            usersMap(user.user_name)?(setAlert(true)):(axios.post("http://localhost:3003/user/",user)  
            .then(res=>navigate("/")));
        } catch (err: any) {
            console.log(err.message);
        }
    }
    return (
        <div className="Register">
            <form className="register" onSubmit={handleSubmit(send)}>
			<div className="form">
                <h4 className="head">Register</h4>
                <div className = "Alert">{alertOn()}</div>
                <label>Enter your first name:</label>
                <input className="form-control" type="text" required {...register("name")}></input>
                <label>Enter your last name:</label>
                <input className="form-control" type="text" required {...register("last_name")}></input>
                <label>Enter User Name:</label>
                <input className="form-control" type="text" required {...register("user_name")}></input>
                <label>Enter Password:</label>
                <input className="form-control" type="password" required {...register("password")}></input>
                <input className="btn btn-primary" required type="submit" value="Register"/>
            </div>
            </form>
        </div>
    );
}

export default Register;
