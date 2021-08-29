import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";

function Home({ games }) {
	const sessionUser = useSelector((state) => state.session.user);

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
