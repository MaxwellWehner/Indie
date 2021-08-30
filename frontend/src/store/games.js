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

export const fiveRandomGames = () => async (dispatch) => {
	const response = await csrfFetch("/api/games/random");
	const data = await response.json();
	dispatch(addGames(data.games));
	return response;
};

export const tenRecentGames = () => async (dispatch) => {
	const response = await csrfFetch("/api/games/");
	const data = await response.json();
	dispatch(addGames(data.games));
	return response;
};

const initialState = {};

function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ADD_GAMES:
			const newSateGames = { ...state };
			action.games.forEach((game) => {
				newSateGames[game.id] = game;
			});
			return newSateGames;
		// case REMOVE_USER:
		// 	newState = Object.assign({}, state, { user: null });
		// 	return newState;
		default:
			return state;
	}
}

export default reducer;
