import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { addOneGame, editGameThunk } from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import { getPublisherIdThunk } from "../../store/session";
import "./CreateGameForm.css";
import HorizontalScroll from "react-scroll-horizontal";

function EditGameForm() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [price, setPrice] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [developer, setDeveloper] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [image, setImage] = useState("");
	const [totalImages, setTotalImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [pubId, setPubId] = useState(null);
	const history = useHistory();
	const game = useSelector((state) => state?.games[id]);
	const images = useSelector((state) => state.images);

	useEffect(() => {
		(async () => {
			if (user) {
				if (user.userType !== "Publisher") {
					history.push("/");
				} else {
					const data = await dispatch(getPublisherIdThunk(user.id));
					setPubId(data.pubId);
				}
			}
		})();
	}, [user, history, dispatch]);

	useEffect(() => {
		if (game && pubId) {
			if (pubId !== game.publisherId) {
				history.push("/");
			}
		}
	}, [game, pubId, history]);

	useEffect(() => {
		if (!game) {
			dispatch(addOneGame(id));
		}
	}, [dispatch, game, id]);

	useEffect(() => {
		if (game) {
			dispatch(addImagesFromArr(game?.Images));
		}
	}, [game, dispatch]);

	useEffect(() => {
		if (game && images) {
			setPrice(+game.price);
			setTitle(game.title);
			setDescription(game.description);
			setDeveloper(game.developer);
			setReleaseDate(game.releaseDate.slice(0, 10));
			const arr = [];
			game?.Images.forEach((imageId) => {
				arr.push(images[imageId]?.imageUrl);
			});
			setTotalImages(arr);
		}
	}, [game, images]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			editGameThunk({
				title,
				price,
				description,
				developer,
				releaseDate,
				totalImages,
				id,
			})
		)
			.then(() => history.push("/publisher"))
			.catch(async (res) => {
				console.log(res);
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	const handleImageAdd = (e) => {
		e.preventDefault();
		setTotalImages((prevState) => [...prevState, image]);
		setImage("");
	};

	const removeImage = (url) => {
		const idx = totalImages.indexOf(url);
		const cpy = [...totalImages];
		cpy.splice(idx, 1);
		setTotalImages(cpy);
	};

	if (!user) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="signUp_form game_form main_content"
			>
				<h1>Edit {game?.title}</h1>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<label>Description</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label>Price</label>
				<input
					type="number"
					step=".01"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
				<label>Developer</label>
				<input
					type="text"
					value={developer}
					onChange={(e) => setDeveloper(e.target.value)}
					required
				/>
				<label>Release Date</label>
				<input
					type="date"
					value={releaseDate}
					onChange={(e) => setReleaseDate(e.target.value)}
				/>
				<label>Image Url</label>
				<div className="img_input_with_btn">
					<input
						type="text"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					<button
						className="form_button"
						onClick={(e) => handleImageAdd(e)}
					>
						Add Image
					</button>
				</div>
				<label>Image Preview(click to remove):</label>
				<HorizontalScroll
					reverseScroll
					className="img-preview_form"
					style={{ width: "60%", height: "20%" }}
				>
					{totalImages.map((imgUrl, i) => (
						<img
							key={i}
							alt="user input img"
							src={imgUrl}
							onClick={() => removeImage(imgUrl)}
						/>
					))}
					<div className="dummy_div">.</div>
				</HorizontalScroll>
				<button
					type="submit"
					className="form_button"
					id="edit_submit_btn"
				>
					Edit
				</button>
			</form>
		</>
	);
}

export default EditGameForm;
