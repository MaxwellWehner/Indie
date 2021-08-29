import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPagePublisher() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
	const [publisherName, setPublisherName] = useState("");
	const [errors, setErrors] = useState([]);
	const userType = "Publisher";

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signupPublisher({
					email,
					username,
					password,
					userType,
					publisherName,
				})
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		}
		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="signUp_form">
				<h1>Publisher Sign Up</h1>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<Link to="/signup">Are You A Shopper?</Link>
				<label>Email</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label>Login Name</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label>Publisher Name</label>
				<input
					type="text"
					value={publisherName}
					onChange={(e) => setPublisherName(e.target.value)}
					required
				/>
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label>Confirm Password</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>

				<button type="submit" className="form_button">
					Sign Up
				</button>
			</form>
		</>
	);
}

export default SignupFormPagePublisher;
