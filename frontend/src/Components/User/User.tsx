// import UserVacationList from "../UserVacationList/UserVacationList";
import UserVacationList from "../UserVacationList/UserVacationList";
import "./User.css";

function User(): JSX.Element {
    const current=localStorage.getItem("myToken");
    console.log(current)
    return (
        <div className="User">
			<main><UserVacationList/></main>

        </div>
    );
}

export default User;
