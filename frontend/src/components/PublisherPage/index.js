import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
	getGamesByIdArr,
	getPublishersGameIds,
	removeGameThunk,
} from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import "./PublisherPage.css";

const PublisherPage = () => {
	const user = useSelector((state) => state.session.user);
	const games = useSelector((state) => state.games);
	const images = useSelector((state) => state.images);
	const [gameIds, setGameIds] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			if (user.userType !== "Publisher") {
				history.push("/");
			}
		}
	}, [user, history]);

	useEffect(() => {
		if (user) {
			(async () => {
				const ids = await dispatch(getPublishersGameIds(user.id));
				setGameIds(ids);
				await dispatch(getGamesByIdArr(ids));
			})();
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (gameIds && Object.keys(games).length) {
			gameIds.forEach((gameId) => {
				dispatch(addImagesFromArr(games[gameId]?.Images));
			});
		}
	}, [gameIds, games]);

	const handleDelete = (gameId) => {
		(async () => {
			await dispatch(removeGameThunk(gameId));
			const newGameIDs = [...gameIds];
			const idx = newGameIDs.indexOf(gameId);
			newGameIDs.splice(idx, 1);
			setGameIds([...newGameIDs]);
		})();

	};

	if (!user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="pub_card_container">
			{gameIds &&
				gameIds.map((gameId) => (
					<div key={gameId} className="pub_game_card">
						<img
							onClick={() => history.push(`/games/${gameId}`)}
							src={images[games[gameId]?.Images[0]]?.imageUrl}
							className="pub_card_img"
						/>
						<div
							className="pub_card_title"
							onClick={() => history.push(`/games/${gameId}`)}
						>
							{games[gameId]?.title}
						</div>
						<div className="pub_card_buttons">Edit Game</div>
						<div
							className="pub_card_buttons"
							id="pub_delete_button"
							onClick={() => handleDelete(gameId)}
						>
							Delete Game
						</div>
					</div>
				))}
			<div
				className="pub_game_card create_game_pub"
				onClick={() => history.push("/create-game")}
			>
				Create Game
			</div>
		</div>
	);
};

export default PublisherPage;
