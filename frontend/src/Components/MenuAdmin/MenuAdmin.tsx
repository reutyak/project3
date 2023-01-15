import { NavLink } from "react-router-dom";
import "./MenuAdmin.css";

function MenuAdmin(): JSX.Element {
    return (
        <nav className=" MenuAdmin navbar navbar-expand-lg navbar-light bg-light">
			<div><NavLink  className="nav-link" to="/admin"><h4>Vacation List</h4></NavLink></div>
            <div><NavLink className="nav-link" to="/admin/addVacation"><h4>Add Vacation</h4></NavLink></div> 
            <div><NavLink className="nav-link" to="/admin/report"><h4>Reports</h4></NavLink></div> 
            <div><NavLink className="nav-link" to="/"><h4>Exit</h4></NavLink></div> 
        </nav>
    );
}

export default MenuAdmin;
