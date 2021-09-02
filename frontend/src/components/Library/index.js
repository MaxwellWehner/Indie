import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGamesByIdArr } from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import { getAllLibraryGames } from "../../store/shopperlibrary";
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

	return (
		<div className="gameLibraryContainer">
			<div className="main_title_library">Your Games</div>
			{Object.keys(shopperLib).map((gameId) => (
				<div key={gameId} className="game_library_card">
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
							{games[gameId]?.description.slice(0, 100).length <
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
								onClick={() => history.push(`/games/${gameId}`)}
							>
								Store Page
							</button>
							<button className="form_button">Hide Game</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ShopperLibrary;
