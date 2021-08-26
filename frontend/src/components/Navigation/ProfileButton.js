import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
  };

  useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
  };

  return (
		<>
			<div onClick={openMenu} className="user_info_button">
				{user.username}
			</div>
			{showMenu && (
				<div className="profile-dropdown">
					<div onClick={logout} className="log_out_button">Log Out</div>
				</div>
			)}
		</>
  );
}

export default ProfileButton;
