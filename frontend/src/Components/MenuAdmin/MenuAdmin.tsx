import { NavLink } from "react-router-dom";
import "./MenuAdmin.css";

function MenuAdmin(): JSX.Element {
    return (
        <div className="MenuAdmin">
			<div><NavLink to="/admin"><h3>Vacation List</h3></NavLink></div>
            <div><NavLink to="/admin/addVacation"><h3>Add Vacation</h3></NavLink></div> 
            <div><NavLink to="/admin/report"><h3>Reports</h3></NavLink></div> 
            <div><NavLink to="/"><h3>Exit</h3></NavLink></div> 
        </div>
    );
}

export default MenuAdmin;
