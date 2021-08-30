import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addOneGame } from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import "./GamePage.css";

const GamePage = () => {
	const { id } = useParams();
	const game = useSelector((state) => state.games[id]);
	const images = useSelector((state) => state.images);
	const [currentImgId, setCurrentImgId] = useState("");
	const dispatch = useDispatch();

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

	const handleMainImg = (imageId) => {
		setCurrentImgId(imageId);
	};

	return (
		<>
			{game && (
				<div className="gamepage">
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
										onClick={() => handleMainImg(imageId)}
									/>
								))}
							</div>
						</div>
						<div className="gamePage_main_Info_container">
							<img
								src={images[game.Images[0]]?.imageUrl}
								className="gamePage_sideImg"
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
				</div>
			)}
		</>
	);
};

export default GamePage;
