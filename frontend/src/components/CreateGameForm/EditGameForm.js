import { set } from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addOneGame, createGameThunk, editGameThunk } from "../../store/games";
import { addImagesFromArr } from "../../store/images";
import * as sessionActions from "../../store/session";
import "./CreateGameForm.css";

function EditGameForm() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [price, setPrice] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [developer, setDeveloper] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [image, setImage] = useState("");
	const [totalImages, setTotalImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const game = useSelector((state) => state?.games[id]);
	const images = useSelector((state) => state.images);

	useEffect(() => {
		if (!game) {
			dispatch(addOneGame(id));
		}
	});

	useEffect(() => {
		if (game) {
			dispatch(addImagesFromArr(game?.Images));
		}
	}, [game]);

	useEffect(() => {
		if (game && images) {
			setPrice(game.price);
			setTitle(game.title);
			setDescription(game.description);
			setDeveloper(game.developer);
			setReleaseDate(game.releaseDate);
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
		).catch(async (res) => {
			history.push("/publisher");
			// const data = await res.json();
			// if (data && data.errors) setErrors(data.errors);
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

	return (
		<>
			<form onSubmit={handleSubmit} className="signUp_form">
				<h1>Create A Game</h1>
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
				<input
					type="text"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<div>
					Image Preview(click to remove):
					{totalImages.map((imgUrl, i) => (
						<div key={i}>
							<img
								src={imgUrl}
								onClick={() => removeImage(imgUrl)}
							/>
						</div>
					))}
				</div>
				<button
					className="form_button"
					onClick={(e) => handleImageAdd(e)}
				>
					Add Image
				</button>
				<button type="submit" className="form_button">
					Create
				</button>
			</form>
		</>
	);
}

export default EditGameForm;
