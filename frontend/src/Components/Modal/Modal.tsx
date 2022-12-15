import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Admin from "../../Models/Admin";
import { LoginModel } from "../../Models/loginModel";
import "./Modal.css";

function Modal(): JSX.Element {
    const {register, handleSubmit} = useForm<Admin>();
    const navigate = useNavigate();

    const send =  async (newAdmin: Admin) => {
        try {
                axios.post("http://localhost:3003/admin/",newAdmin)
                .then(res=>(navigate("/")))
        } catch (err: any) {
            console.log(err.message);
        }
    }
    return (
        <div className="Modal">
			<form onSubmit={handleSubmit(send)}>
			<div className="Box">
                <label>Enter Admin Name</label>
                <input type="text" required {...register("admin_name")}></input>
                <label>Enter Admin Password</label>
                <input type="password" required {...register("admin_code")}></input>
                <input required type="submit" value="Start"/>
            </div>
            </form>
        </div>
    );
}

export default Modal;
