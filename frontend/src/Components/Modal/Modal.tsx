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
			<form className="login" onSubmit={handleSubmit(send)}>
			<h4 className="head">System Boot</h4>
                <label>Enter Admin Name</label>
                <input className="form-control" type="text" required {...register("admin_name")}></input>
                <label>Enter Admin Password</label>
                <input className="form-control" type="password" required {...register("admin_code")}></input>
                <input className="btn btn-primary" required type="submit" value="Start"/>
            </form>
        </div>
    );
}

export default Modal;
