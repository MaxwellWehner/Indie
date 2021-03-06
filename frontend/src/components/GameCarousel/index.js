import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./GameCarousel.css";
import { useHistory } from "react-router-dom";

const GameCarousel = ({ gameIds }) => {
	const games = useSelector((state) => state.games);
	const images = useSelector((state) => state.images);
	const [currentGame, setCurrentGame] = useState(games[gameIds[0]]);
    const [currentGameIdx, setCurrentGameIdx] = useState(0);
	const [mainImg, setMainImg] = useState("");
	const history = useHistory();

	useEffect(() => {
		setCurrentGame(games[gameIds[currentGameIdx]]);
	}, [currentGameIdx, games, gameIds]);

	useEffect(() => {
		if (currentGame) {
			setMainImg(images[currentGame.Images[0]]?.imageUrl);
		}
	}, [currentGame, images]);

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
				<i className="fas fa-chevron-left fa-3x"></i>
			</div>
			<div className="carousel_container" onClick={goToGame}>
				<img
					src={mainImg}
					className="carousel_main_img"
					alt="main game img"
				/>
				<div className="carousel_game_info">
					<div className="carousel_game_info_title">
						{currentGame.title}
					</div>
					<div className="img_container">
						<img
							src={images[currentGame.Images[1]]?.imageUrl}
							onMouseOver={() =>
								setMainImg(
									images[currentGame.Images[1]]?.imageUrl
								)
							}
							onMouseLeave={() =>
								setMainImg(
									images[currentGame.Images[0]]?.imageUrl
								)
							}
							alt="game img 1"
						/>
						<img
							src={images[currentGame.Images[2]]?.imageUrl}
							onMouseOver={() =>
								setMainImg(
									images[currentGame.Images[2]]?.imageUrl
								)
							}
							onMouseLeave={() =>
								setMainImg(
									images[currentGame.Images[0]]?.imageUrl
								)
							}
							alt="game img 2"
						/>
						<img
							src={images[currentGame.Images[3]]?.imageUrl}
							onMouseOver={() =>
								setMainImg(
									images[currentGame.Images[3]]?.imageUrl
								)
							}
							onMouseLeave={() =>
								setMainImg(
									images[currentGame.Images[0]]?.imageUrl
								)
							}
							alt="game img 3"
						/>
						<img
							src={images[currentGame.Images[4]]?.imageUrl}
							onMouseOver={() =>
								setMainImg(
									images[currentGame.Images[4]]?.imageUrl
								)
							}
							onMouseLeave={() =>
								setMainImg(
									images[currentGame.Images[0]]?.imageUrl
								)
							}
							alt="game img 4"
						/>
					</div>
					<div className="bottom_info">
						<div>Now Available</div>
						<div>{currentGame.price}</div>
					</div>
				</div>
			</div>
			<div className="nav_car_button_right" onClick={handleRight}>
				<i className="fas fa-chevron-right fa-3x" />
			</div>
		</div>
	);
};

export default GameCarousel;
