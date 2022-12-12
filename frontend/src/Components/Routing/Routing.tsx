import { Route, Routes } from "react-router-dom";
import AddVacation from "../addVacation/addVacation";
import Admin from "../Admin/Admin";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Report from "../Report/Report";
import User from "../User/User";
import VacationList from "../vacationList/vacationList";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path = "/" element={<Login/>}/>
                <Route path = "/register" element= {<Register/>}/>
                <Route path = "/admin" element={<Admin/>}/>
                <Route path = "/admin/addVacation" element={<AddVacation/>}/>
                <Route path = "/admin/report" element={<Report/>}/>
                <Route path = "/user" element={<User/>}/>
                <Route path = "*" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
