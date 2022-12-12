import MenuAdmin from "../MenuAdmin/MenuAdmin";
import VacationList from "../vacationList/vacationList";
import "./Admin.css";

function Admin(): JSX.Element {
    return (
        <div className="Admin">
			<header><MenuAdmin/></header>
            <main><VacationList/></main>
        </div>
    );
}

export default Admin;
