import { NavLink } from "react-router-dom";
import "./MenuAdmin.css";

function MenuAdmin(): JSX.Element {
    return (
        <nav className=" MenuAdmin navbar navbar-expand-lg navbar-light bg-light">
			<div><NavLink  className="nav-link" to="/admin"><h6>Vacation List</h6></NavLink></div>
            <div><NavLink className="nav-link" to="/admin/addVacation"><h6>Add Vacation</h6></NavLink></div> 
            <div><NavLink className="nav-link" to="/admin/report"><h6>Reports</h6></NavLink></div> 
            <div><NavLink className="nav-link" to="/"><h6>Exit</h6></NavLink></div> 
        </nav>
    );
}

export default MenuAdmin;
