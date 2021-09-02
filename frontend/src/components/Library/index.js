import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesByIdArr } from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import { getAllLibraryGames } from "../../store/shopperlibrary";

const ShopperLibrary = () => {
	const user = useSelector((state) => state.session.user);
	const shopperLib = useSelector((state) => state.shopperLibrary);
	const games = useSelector((state) => state.games);
	const images = useSelector((state) => state.images);
	const [totalImg, setTotalImg] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(getAllLibraryGames(user.id));
		}
	}, [user]);

	useEffect(() => {
		if (shopperLib) {
			dispatch(getGamesByIdArr(Object.keys(shopperLib)));
		}
	}, [shopperLib]);

	useEffect(() => {
		if (games) {
			let temp = [];
			Object.keys(games).forEach((gameId) => {
				temp = [...temp, ...games[gameId].Images];
			});
			setTotalImg(temp);
		}
	}, [games]);

	useEffect(() => {
		if (totalImg) {
			dispatch(addImagesFromArr(totalImg));
		}
	}, [totalImg]);

	return (
		<div>
			{Object.keys(shopperLib).map((gameId) => (
				<div key={gameId}>
					<img src={images[games[gameId]?.Images[0]]?.imageUrl} />
					<div>{games[gameId]?.title}</div>
				</div>
			))}
		</div>
	);
};

export default ShopperLibrary;
