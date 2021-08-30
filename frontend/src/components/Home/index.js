import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { fiveRandomGames, tenRecentGames } from "../../store/games";
import GameCarousel from "../GameCarousel";

function Home() {
	const sessionUser = useSelector((state) => state.session.user);
	const games = useSelector((state) => state.games);
	const [randomGames, setRandomGames] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(fiveRandomGames());
		dispatch(tenRecentGames());
	}, [dispatch]);

	useEffect(() => {
		if (games) {
			let rnd = new Set();
			while (rnd.size < 5) {
				rnd.add(
					Object.keys(games)[
						Math.floor(Math.random() * Object.keys(games).length)
					]
				);
			}
			setRandomGames(Array.from(rnd));
		}
	}, [games]);

	return (
		<div>
			{games && Object.keys(games).length && (
				<GameCarousel games={randomGames} />
			)}

			{games &&
				Object.keys(games).map((gameId) => (
					<div key={gameId}>
						<div>game: {games[gameId].title}</div>
						<div>publisher: {games[gameId].publisherName}</div>
						<div>release Date: {games[gameId].releaseDate}</div>
						{/* <img src={game.images[0]} alt="game screenshot" /> */}
					</div>
				))}
		</div>
	);
}

export default Home;
