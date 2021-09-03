import { csrfFetch } from "./csrf.js";

const ADD_TO_LIBRARY = "library/ADD_TO_LIBRARY";
const GET_ALL_GAMES = "library/GET_ALL_GAMES";
const REMOVE_GAME = "library/REMOVE_GAME";

const addToLibrary = (gameId, hidden) => ({
	type: ADD_TO_LIBRARY,
	gameId,
	hidden,
});

const getGamesFromLib = (gameInfo) => ({
	type: GET_ALL_GAMES,
	gameInfo,
});

const removeGame = (gameId) => ({
	type: REMOVE_GAME,
	gameId,
});

export const getAllLibraryGames = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/library/${userId}`);
	const data = await response.json();
	dispatch(getGamesFromLib(data.ans));
	return data;
};

export const addGameToLibrary = (gameId) => async (dispatch) => {
	const response = await csrfFetch("/api/library", {
		method: "POST",
		body: JSON.stringify({
			gameId,
		}),
	});
	const data = await response.json();

	dispatch(addToLibrary(data.gameId, data.hidden));
	return response;
};

export const setHideOnGame = (gameId) => async (dispatch) => {
	const response = await csrfFetch("/api/library", {
		method: "PUT",
		body: JSON.stringify({
			gameId,
		}),
	});

	const data = await response.json();
	dispatch(addToLibrary(data.gameId, data.hidden));
	return response;
};

export const removeGameFromLibrary = (gameId) => async (dispatch) => {
	const response = await csrfFetch(`/api/library/${gameId}`, {
		method: "DELETE",
	});

	const data = await response.json();
	dispatch(removeGame(gameId));
	return data;
};

const initialState = {};

function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_LIBRARY:
			const newLibraryState = { ...state };
			newLibraryState[action.gameId] = action.hidden;
			return newLibraryState;
		case GET_ALL_GAMES:
			const newGetLibState = {};
			action.gameInfo.forEach((game) => {
				newGetLibState[Object.keys(game)[0]] =
					game[Object.keys(game)[0]];
			});
			return newGetLibState;
		case REMOVE_GAME:
			const newDeleteState = { ...state };
			delete newDeleteState[action.gameId];
			return newDeleteState;
		default:
			return state;
	}
}

export default reducer;
