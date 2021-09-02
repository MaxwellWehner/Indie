import { csrfFetch } from "./csrf.js";

const ADD_TO_LIBRARY = "library/ADD_TO_LIBRARY";
const GET_ALL_GAMES = "library/GET_ALL_GAMES";

const addToLibrary = (gameId, hidden) => ({
	type: ADD_TO_LIBRARY,
	gameId,
	hidden,
});

const getGamesFromLib = (gameInfo) => ({
	type: GET_ALL_GAMES,
	gameInfo,
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
		default:
			return state;
	}
}

export default reducer;
