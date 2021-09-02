import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addOneGame } from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import {
	addGameToLibrary,
	getAllLibraryGames,
} from "../../store/shopperlibrary";
import "./GamePage.css";

const GamePage = () => {
	const { id } = useParams();
	const user = useSelector((state) => state.session.user);
	const game = useSelector((state) => state.games[id]);
	const images = useSelector((state) => state.images);
	const shopperLibrary = useSelector((state) => state.shopperLibrary);
	const [currentImgId, setCurrentImgId] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (!game) {
			dispatch(addOneGame(id));
		}
	}, [game, id, dispatch]);

	useEffect(() => {
		(async () => {
			if (game) {
				if (
					Object.keys(images).every(
						(imageId) => game.Images.indexOf(imageId) >= 0
					)
				) {
					await dispatch(addImagesFromArr(game.Images));
				}
			}
		})();
	}, [game, images, dispatch]);

	useEffect(() => {
		setCurrentImgId(game?.Images[0]);
	}, [images, game]);

	useEffect(() => {
		if (user && user.userType === "Shopper") {
			dispatch(getAllLibraryGames(user.id));
		}
	}, [user, dispatch]);

	const handleMainImg = (imageId) => {
		setCurrentImgId(imageId);
	};

	const addGameToLib = async () => {
		await dispatch(addGameToLibrary(id));
	};

	return (
		<>
			{game && (
				<div className="gamepage main_content">
					<div className="gamePage_Title">{game.title}</div>
					<div className="gamePage_cameCard">
						<div className="img_container_mainPage">
							<img
								src={images[currentImgId]?.imageUrl}
								className="gamePage_mainImg"
								alt="main game img"
							></img>
							<div>
								{game.Images.map((imageId) => (
									<img
										key={imageId}
										src={images[imageId]?.imageUrl}
										className="previewImage"
										alt="preview game img"
										onClick={() => handleMainImg(imageId)}
									/>
								))}
							</div>
						</div>
						<div className="gamePage_main_Info_container">
							<img
								src={images[game.Images[0]]?.imageUrl}
								className="gamePage_sideImg"
								alt="side game img"
							/>
							<div className="gamePage_description">
								{game.description}
							</div>
							<div className="small_info_contaner">
								<div>
									<div>Release Date:</div>
									<div>Developer:</div>
									<div>Publisher:</div>
								</div>
								<div id="small_actual_info">
									<div>{game.releaseDate.slice(0, 10)}</div>
									<div>{game.developer}</div>
									<div>{game.Publisher}</div>
								</div>
							</div>
						</div>
					</div>
					{user && user.userType === "Shopper" ? (
						<div className="purchase_container">
							<div className="buy_title">Buy {game.title}</div>
							{game && shopperLibrary[game.id] === undefined ? (
								<div className="purchase_buttons_container">
									<div className="button_price">
										{game.price}
									</div>
									<button
										onClick={addGameToLib}
										className="purchase_button"
									>
										Add to Library
									</button>
								</div>
							) : (
								<div
									className="purchase_buttons_container"
									id="game_in_library"
									onClick={() => history.push(`/library`)}
								>
									Game In Library
								</div>
							)}
						</div>
					) : null}
				</div>
			)}
		</>
	);
};

export default GamePage;
