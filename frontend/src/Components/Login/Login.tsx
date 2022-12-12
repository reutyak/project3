import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Admin from "../../Models/Admin";
import { LoginModel } from "../../Models/loginModel";
import User from "../../Models/User";
import "./Login.css";

function Login(): JSX.Element {
    const [users, setUsers] = useState<User[]>([]);
    const [admin, setAdmin] = useState<Admin>();
    const {register, handleSubmit} = useForm<LoginModel>();
    const navigate = useNavigate();

    return (
        <div className="Login">
			<div className="Box">
                <h2>Login</h2>
                <label>Select a user type</label>
                <select required {...register("typeUser")}>
                    <option>admin</option>
                    <option>user</option>
                </select>
                <label>Enter User Name</label>
                <input type="text" required {...register("user_name")}></input>
                <label>Enter Password</label>
                <input type="password" required {...register("password")}></input>
                <input required type="submit" value="Entrance"/>

                {/* <button>Enter</button> */}
                <button><NavLink to="/register"><h3>Register</h3></NavLink></button>
            </div>
        </div>
    );
}

export default Login;
