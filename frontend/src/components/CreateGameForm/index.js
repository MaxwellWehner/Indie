import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGameThunk } from "../../store/games";
import "./CreateGameForm.css";

function GameForm() {
	const dispatch = useDispatch();
	const [price, setPrice] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [developer, setDeveloper] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [image, setImage] = useState("");
	const [totalImages, setTotalImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		return dispatch(
			createGameThunk({
				title,
				price,
				description,
				developer,
				releaseDate,
				totalImages,
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

	return (
		<>
			<form onSubmit={handleSubmit} className="signUp_form game_form">
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
					required
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
				<label>Image Preview:</label>
				<div className="img-preview_form">
					{totalImages.map((imgUrl, i) => (
						<img
							key={i}
							alt="user input img"
							onClick={() => removeImage(imgUrl)}
							src={imgUrl}
						/>
					))}
				</div>
				<button type="submit" className="form_button">
					Create
				</button>
			</form>
		</>
	);
}

export default GameForm;
