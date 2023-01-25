import "./Header.css";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

function Header(): JSX.Element {
    return (
        <div className="Header">
            
			<h3 className="header">VACATION&nbsp;&nbsp;<AirplanemodeActiveIcon fontSize="large" color="primary"></AirplanemodeActiveIcon></h3>
            
            <h6 className="second">The right place for your <span className="span">next</span> vacation...</h6>
        </div>
    );
}

export default Header;