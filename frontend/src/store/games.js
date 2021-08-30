import { csrfFetch } from "./csrf.js";

const ADD_GAME = "games/ADD_GAME";
const ADD_GAMES = "games/ADD_GAMES";
const REMOVE_GAME = "games/REMOVE_GAME";

const addGames = (games) => ({
	type: ADD_GAMES,
	games,
});

const addGame = (game) => ({
	type: ADD_GAME,
	game,
});

const removeGame = (id) => ({
	type: REMOVE_GAME,
	id,
});

// export const fiveRandomGames = () => async (dispatch) => {
// 	const response = await csrfFetch("/api/games/random");
// 	const data = await response.json();
// 	dispatch(addGames(data.games));
// 	return response;
// };

export const getPublishersGameIds = (userId) => async () => {
	const response = await csrfFetch(`/api/games/publisher/${userId}`);
	const data = await response.json();
	const gameIds = [];
	data.publisher.Games.forEach((game) => gameIds.push(game.id));
	//changes image to imgae ID arr
	// data.game.Publisher = data.game.Publisher.publisherName; //changes publisher name to be direct

	return gameIds;
};

export const editGameThunk =
	({ title, price, description, developer, releaseDate, totalImages, id }) =>
	async (dispatch) => {
		const response = await csrfFetch(`/api/games/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				title,
				price,
				description,
				developer,
				releaseDate,
				totalImages,
			}),
		});
		const data = await response.json();
		data.game.Images.forEach(
			(image, iIdx) => (data.game["Images"][iIdx] = image.id)
		);
		//changes image to imgae ID arr
		data.game.Publisher = data.game.Publisher.publisherName; //changes publisher name to be direct
		dispatch(addGame(data.game));
		return response;
	};

export const removeGameThunk = (gameId) => async (dispatch) => {
	const response = await csrfFetch(`/api/games/${gameId}`, {
		method: "DELETE",
	});
	// const data = await response.json();
	dispatch(removeGame(gameId));
	// return data;
};

export const addOneGame = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/games/${id}`);
	const data = await response.json();
	data.game.Images.forEach(
		(image, iIdx) => (data.game["Images"][iIdx] = image.id)
	);
	//changes image to imgae ID arr
	data.game.Publisher = data.game.Publisher.publisherName; //changes publisher name to be direct

	dispatch(addGame(data.game));
	return response;
};

export const tenRecentGames = () => async (dispatch) => {
	const response = await csrfFetch("/api/games/");
	const data = await response.json();
	data.games.forEach((game, gIdx) =>
		game.Images.forEach(
			(image, iIdx) => (data.games[gIdx]["Images"][iIdx] = image.id)
		)
	); //changes image to imgae ID arr
	data.games.forEach(
		(game, gIdx) =>
			(data.games[gIdx].Publisher = game.Publisher.publisherName) //changes publisher name to be direct
	);
	dispatch(addGames(data.games));
	return response;
};

export const createGameThunk =
	({ title, price, description, developer, releaseDate, totalImages }) =>
	async (dispatch) => {
		const response = await csrfFetch("/api/games", {
			method: "POST",
			body: JSON.stringify({
				title,
				price,
				description,
				developer,
				releaseDate,
				totalImages,
			}),
		});
		const data = await response.json();
		data.game.Images.forEach(
			(image, iIdx) => (data.game["Images"][iIdx] = image.id)
		);
		//changes image to imgae ID arr
		data.game.Publisher = data.game.Publisher.publisherName; //changes publisher name to be direct
		dispatch(addGame(data.game));
		return response;
	};

export const getGamesByIdArr = (Ids) => async (dispatch) => {
	const response = await csrfFetch("/api/games/array", {
		method: "POST",
		body: JSON.stringify({
			array: Ids,
		}),
	});
	const data = await response.json();
	data.games.forEach((game, gIdx) =>
		game.Images.forEach(
			(image, iIdx) => (data.games[gIdx]["Images"][iIdx] = image.id)
		)
	); //changes image to imgae ID arr
	data.games.forEach(
		(game, gIdx) =>
			(data.games[gIdx].Publisher = game.Publisher.publisherName) //changes publisher name to be direct
	);
	dispatch(addGames(data.games));
	return response;
};

const initialState = {};

function reducer(state = initialState, action) {
	// let newState;
	switch (action.type) {
		case ADD_GAMES:
			const newSateGames = { ...state };
			action.games.forEach((game) => {
				newSateGames[game.id] = game;
			});
			return newSateGames;
		case ADD_GAME:
			const newAddSateGames = { ...state };
			newAddSateGames[action.game.id] = action.game;
			return newAddSateGames;
		case REMOVE_GAME:
			console.log("in reducer");
			const removeState = { ...state };
			delete removeState[action.id];
			return removeState;
		default:
			return state;
	}
}

export default reducer;
