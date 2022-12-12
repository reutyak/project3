import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Main.css";

function Main(): JSX.Element {
    return (
        <div className="Main">
			<header><Header/></header>
            <main><Routing/></main>
        </div>
    );
}

export default Main;
