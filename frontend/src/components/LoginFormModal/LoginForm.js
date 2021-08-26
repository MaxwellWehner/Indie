import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

    const handleDemo = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			sessionActions.login({
				credential: "demo@user.io",
				password: "password",
			})
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit} className="logIn_form">
				<ul className="login_errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>Username or Email</label>
				<input
					type="text"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
				/>
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<div>
					<button type="submit" className="form_button">
						Log In
					</button>
					<button onClick={handleDemo} className="form_button">
						Demo Login
					</button>
				</div>
			</form>
		</>
	);
}

export default LoginForm;
