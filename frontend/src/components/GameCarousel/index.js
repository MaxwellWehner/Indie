import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./GameCarousel.css";
import { useHistory } from "react-router-dom";

const GameCarousel = ({ gameIds }) => {
	const games = useSelector((state) => state.games);
	const images = useSelector((state) => state.images);
	const [currentGame, setCurrentGame] = useState(games[gameIds[0]]);
	const [currentGameIdx, setCurrentGameIdx] = useState(0);
	const history = useHistory();

	useEffect(() => {
		setCurrentGame(games[gameIds[currentGameIdx]]);
	}, [currentGameIdx]);

	const handleRight = () => {
		if (currentGameIdx === gameIds.length - 1) {
			setCurrentGameIdx(0);
		} else {
			setCurrentGameIdx((prevState) => prevState + 1);
		}
	};

	const handleLeft = () => {
		if (currentGameIdx === 0) {
			setCurrentGameIdx(gameIds.length - 1);
		} else {
			setCurrentGameIdx((prevState) => prevState - 1);
		}
	};

	const goToGame = () => {
		history.push(`/games/${currentGame.id}`);
	};

	return (
		<div className="carousel">
			<div className="nav_car_button_left" onClick={handleLeft}>
				<i class="fas fa-chevron-left fa-3x"></i>
			</div>
			<div className="carousel_container" onClick={goToGame}>
				<img
					src={images[currentGame.Images[0]]?.imageUrl}
					className="carousel_main_img"
				/>
				<div className="carousel_game_info">
					<div className="carousel_game_info_title">
						{currentGame.title}
					</div>
					<div className="img_container">
						<img src={images[currentGame.Images[1]]?.imageUrl} />
						<img src={images[currentGame.Images[2]]?.imageUrl} />
						<img src={images[currentGame.Images[3]]?.imageUrl} />
						<img src={images[currentGame.Images[4]]?.imageUrl} />
					</div>
					<div className="bottom_info">
						<div>Now Available</div>
						<div>{currentGame.price}</div>
					</div>
				</div>
			</div>
			<div className="nav_car_button_right" onClick={handleRight}>
				<i class="fas fa-chevron-right fa-3x" />
			</div>
		</div>
	);
};

export default GameCarousel;
