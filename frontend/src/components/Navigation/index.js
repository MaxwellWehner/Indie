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
		if (sessionUser.userType === "Publisher") {
			sessionLinks = (
				<>
					<NavLink to="/publisher">Your Games</NavLink>
					<ProfileButton user={sessionUser} />
				</>
			);
		} else {
			sessionLinks = (
				<>
					<NavLink to="/library">Your Library</NavLink>
					<ProfileButton user={sessionUser} />
				</>
			);
		}
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
			<NavLink exact to="/" className="icon_link">
				<img src="/icons8-joystick-60.png" alt="Icon" />
			</NavLink>
			<NavLink exact to="/">
				Store
			</NavLink>
			{isLoaded && sessionLinks}
		</div>
	);
}

export default Navigation;
