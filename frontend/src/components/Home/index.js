import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { tenRecentGames } from "../../store/games";
import GameCarousel from "../GameCarousel";
import { addImagesFromArr } from "../../store/images";
import { useHistory } from "react-router-dom";

function Home() {
	const games = useSelector((state) => state.games);
	const images = useSelector((state) => state.images);
	const [imgsToAdd, setImgsToAdd] = useState([]);
	// const [randomGames, setRandomGames] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
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

	const goToGame = (gameId) => {
		history.push(`/games/${gameId}`);
	};

	return (
		<div className="home_container main_content">
			{Object.keys(games).length >= 5 &&
				Object.keys(images).length > 5 && (
					<GameCarousel gameIds={[1, 2, 4]} />
				)}
			<div className="home_gameCard_container">
				{Object.keys(games).length &&
					Object.keys(images).length &&
					Object.keys(games).map((gameId) => (
						<div
							key={gameId}
							className="home_gameCard"
							onClick={() => goToGame(gameId)}
						>
							<img
								src={images[games[gameId].Images[0]]?.imageUrl}
								alt="card info img"
							/>

							<div className="home_gameCard_title">
								{games[gameId].title}
							</div>
							<div className="home_gameCard_price">
								${games[gameId].price}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default Home;
