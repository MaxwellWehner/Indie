import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<>
				<NavLink to="/library">Your Library</NavLink>
				<ProfileButton user={sessionUser} />
			</>
		);
	} else {
		sessionLinks = (
			<div className="user_access">
				<LoginFormModal />
				<NavLink to="/signup">Sign Up</NavLink>
			</div>
		);
	}

	return (
		<div className="nav_bar">
			<NavLink exact to="/">
				Home
			</NavLink>
			<NavLink exact to="/store">
				Store
			</NavLink>
			{isLoaded && sessionLinks}
		</div>
	);
}

export default Navigation;
