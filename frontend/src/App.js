import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';
import Home from "./components/Home";
import SignupFormPagePublisher from "./components/SignupFormPage/SignUpFormPubisher";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	//   const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const games = [
		{
			name: "Hollow Knight",
			publisherName: "Team Cherry",
			releaseDate: "Feb 24, 2017",
			images: [
				"https://cdn.akamai.steamstatic.com/steam/apps/367520/ss_47f3523dbea462aff2ca4bc9f605faaf80a792b2.1920x1080.jpg?t=1625363925",
			],
		},
		{
			name: "Darkest Dungeon",
			publisherName: "Red Hook Studios",
			releaseDate: "Jan 19, 2016",
			images: [
				"https://cdn.akamai.steamstatic.com/steam/apps/262060/ss_04572edc979601b038756f87861c6f8c6c337806.1920x1080.jpg?t=1618936132",
			],
		},
		{
			name: "Blasphemous",
			publisherName: "Team17",
			releaseDate: "Sep 10, 2019",
			images: [
				"https://cdn.akamai.steamstatic.com/steam/apps/774361/ss_bd57bcb1e9183cbea61339727a97bcc5206677b2.1920x1080.jpg?t=1628160701",
			],
		},
		{
			name: "Celeste",
			publisherName: "Matt Makes Games Inc.",
			releaseDate: "Jan 25, 2018",
			images: [
				"https://cdn.akamai.steamstatic.com/steam/apps/504230/ss_03bfe6bd5ddac7f747c8d2aa1a4f82cfd53c6dcb.1920x1080.jpg?t=1617130992",
			],
		},
		{
			name: "Enter the Gungeon",
			publisherName: "Devolver Digital",
			releaseDate: "Apr 5, 2016",
			images: [
				"https://cdn.akamai.steamstatic.com/steam/apps/311690/header.jpg?t=1622216602",
			],
		},
	];

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}
			{isLoaded && (
				<Switch>
					{/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
					<Route exact path="/">
						<Home games={games} />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/signup-publisher">
						<SignupFormPagePublisher />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
