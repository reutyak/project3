import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            {/* <TravelExploreIcon></TravelExploreIcon> */}
			<h3 className="header">VACATION</h3>
            <h4 className="second">The right place for your <span className="span">next</span> vacation...</h4>
        </div>
    );
}

export default Header;