import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getGamesByIdArr } from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import { getAllLibraryGames, setHideOnGame } from "../../store/shopperlibrary";
import "./Library.css";

const ShopperLibrary = () => {
	const user = useSelector((state) => state.session.user);
	const shopperLib = useSelector((state) => state.shopperLibrary);
	const games = useSelector((state) => state.games);
	const images = useSelector((state) => state.images);
	const [totalImg, setTotalImg] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (user) {
			if (user.userType !== "Shopper") {
				history.push("/");
			}
		}
	}, [user, history]);

	useEffect(() => {
		if (user && user.userType === "Shopper") {
			dispatch(getAllLibraryGames(user.id));
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (shopperLib) {
			dispatch(getGamesByIdArr(Object.keys(shopperLib)));
		}
	}, [shopperLib, dispatch]);

	useEffect(() => {
		if (games) {
			let temp = [];
			Object.keys(games).forEach((gameId) => {
				temp = [...temp, ...games[gameId].Images];
			});
			setTotalImg(temp);
		}
	}, [games, dispatch]);

	useEffect(() => {
		if (totalImg) {
			dispatch(addImagesFromArr(totalImg));
		}
	}, [dispatch, totalImg]);

	const handleHide = (gameId) => {
		dispatch(setHideOnGame(gameId));
	};

	if (!user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="gameLibraryContainer">
			<div className="main_title_library">Your Games</div>
			{Object.keys(shopperLib).map((gameId) => (
				<div key={gameId}>
					{shopperLib[gameId] === false && (
						<div className="game_library_card">
							<img
								className="game_library_card_main_img"
								alt="game library card main img"
								src={images[games[gameId]?.Images[0]]?.imageUrl}
							/>
							<div className="game_info_library_card">
								<div className="game_library_card_title">
									{games[gameId]?.title}
								</div>
								<div>
									{games[gameId]?.description.slice(0, 100)
										.length <
									games[gameId]?.description.length
										? `${games[gameId]?.description.slice(
												0,
												100
										  )}...`
										: games[gameId]?.description}
								</div>
								<div className="library_buttons_container">
									<button
										className="form_button"
										onClick={() =>
											history.push(`/games/${gameId}`)
										}
									>
										Store Page
									</button>
									<button
										className="form_button"
										onClick={() => handleHide(gameId)}
									>
										Hide Game
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default ShopperLibrary;
