import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";
import { csrfFetch } from "../../store/csrf";

function Home({ games }) {
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			await csrfFetch("/api/games/test");
		})();
	}, [sessionUser]);

	return (
		<div>
			{games.map((game) => (
				<>
					<div>game: {game.name}</div>
					<div>publisher: {game.publisherName}</div>
					<div>release Date: {game.releaseDate}</div>
					<img src={game.images[0]} alt="game screenshot" />
				</>
			))}
		</div>
	);
}

export default Home;
