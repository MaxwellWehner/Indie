import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { tenRecentGames } from "../../store/games";
import GameCarousel from "../GameCarousel";
import { addImagesFromArr } from "../../store/images";

function Home() {
	// const sessionUser = useSelector((state) => state.session.user);
	const games = useSelector((state) => state.games);
	const [imgsToAdd, setImgsToAdd] = useState([]);
	// const [randomGames, setRandomGames] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(fiveRandomGames());
		dispatch(tenRecentGames());
	}, [dispatch]);

	// useEffect(() => { //makes infinite lopp sometimes?????
	// 	if (games) {
	// 		let rnd = new Set();
	// 		while (rnd.size < 5) {
	// 			rnd.add(
	// 				Object.keys(games)[
	// 					Math.floor(Math.random() * Object.keys(games).length)
	// 				]
	// 			);
	// 		}
	// 		setRandomGames(Array.from(rnd));
	// 	}
	// }, [games]);

	useEffect(() => {
		if (Object.keys(games).length) {
			let arr = [];
			Object.keys(games).forEach((gameId) => {
				arr = [...arr, ...games[gameId].Images];
			});
			setImgsToAdd(arr);
		}
	}, [dispatch, games]);

	useEffect(() => {
		if (imgsToAdd) {
			dispatch(addImagesFromArr(imgsToAdd));
		}
	}, [imgsToAdd, dispatch]);

	return (
		<div>
			{games && Object.keys(games).length && (
				<GameCarousel games={[1, 2, 3]} />
			)}

			{games &&
				Object.keys(games).map((gameId) => (
					<div key={gameId}>
						<div>game: {games[gameId].title}</div>
						<div>publisher: {games[gameId].publisherName}</div>
						<div>release Date: {games[gameId].releaseDate}</div>
					</div>
				))}
		</div>
	);
}

export default Home;
