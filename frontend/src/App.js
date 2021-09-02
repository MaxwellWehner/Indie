import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignupFormPagePublisher from "./components/SignupFormPage/SignUpFormPubisher";
import GamePage from "./components/GamePage";
import PublisherPage from "./components/PublisherPage";
import GameForm from "./components/CreateGameForm";
import EditGameForm from "./components/CreateGameForm/EditGameForm";
import ShopperLibrary from "./components/Library";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />

			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/signup-publisher">
						<SignupFormPagePublisher />
					</Route>
					<Route path="/games/:id">
						<GamePage />
					</Route>
					<Route path="/publisher">
						<PublisherPage />
					</Route>
					<Route path="/create-game">
						<GameForm />
					</Route>
					<Route path="/library">
						<ShopperLibrary />
					</Route>
					<Route path="/edit-game/:id">
						<EditGameForm />
					</Route>
					<Route>
						<Redirect to="/" />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
