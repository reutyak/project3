import MenuAdmin from "../MenuAdmin/MenuAdmin";
import VacationList from "../vacationList/vacationList";


function Admin(): JSX.Element {
    return (
        <div className="Admin">
			<header><MenuAdmin/></header>
            <main><VacationList/></main>
        </div>
    );
}

export default Admin;
