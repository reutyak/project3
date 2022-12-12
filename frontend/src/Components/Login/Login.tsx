import "./Login.css";

function Login(): JSX.Element {
    return (
        <div className="Login">
			<div className="Box">
                <h2>Login</h2>
            <label>Select a user type</label>
                <select>
                    <option>admin</option>
                    <option>user</option>
                </select>
            </div>
        </div>
    );
}

export default Login;
