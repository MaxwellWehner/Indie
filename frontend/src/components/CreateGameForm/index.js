import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { createGameThunk } from "../../store/games";
import * as sessionActions from "../../store/session";
import "./CreateGameForm.css";

function GameForm() {
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

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		if (image) {
			setTotalImages((prevState) => [...prevState, ...image]);
		}

		return dispatch(
			createGameThunk({
				title,
				price,
				description,
				developer,
				releaseDate,
				totalImages,
			})
		).catch(async (res) => {
			// const data = await res.json();
			// if (data && data.errors) setErrors(data.errors);
		});
	};

	const handleImageAdd = (e) => {
		e.preventDefault();
		setTotalImages((prevState) => [...prevState, image]);
		setImage("");
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
					required
				/>
				<label>Image Url</label>
				<input
					type="text"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<div>
					Image Preview:
					{totalImages.map((imgUrl) => (
						<div key={imgUrl}>
							<img src={imgUrl} />
						</div>
					))}
				</div>
				<button
					className="form_button"
					onClick={(e) => handleImageAdd(e)}
				>
					Add another Image
				</button>
				<button type="submit" className="form_button">
					Create
				</button>
			</form>
		</>
	);
}

export default GameForm;
