import { csrfFetch } from "./csrf.js";

const ADD_TO_LIBRARY = "library/ADD_TO_LIBRARY";

const addToLibrary = (gameId, hidden) => ({
	type: ADD_TO_LIBRARY,
	gameId,
	hidden,
});

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

const initialState = {};

function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_LIBRARY:
			const newLibraryState = { ...state };
			newLibraryState[action.gameId] = action.hidden;
			return newLibraryState;
		default:
			return state;
	}
}

export default reducer;
