import { NavLink } from "react-router-dom";
import "./MenuUser.css";

function MenuUser(): JSX.Element {
    return (
        <div className="MenuUser">
		<nav className="MenuUser navbar navbar-expand-lg navbar-light bg-light" id="exit">
            <div><NavLink className="nav-link" to="/"><h6>Exit</h6></NavLink></div> 
        </nav>
        </div>
    );
}

export default MenuUser;
