import { csrfFetch } from "./csrf.js";

// const ADD_GAME = "games/ADD_GAME";
const ADD_IMAGES = "images/ADD_IMAGES";
// const REMOVE_GAME = "games/REMOVE_GAME";

const addImages = (images) => ({
	type: ADD_IMAGES,
	images,
});

// const addGame = (game) => ({
// 	type: ADD_GAME,
// 	game,
// });

// const removeGame = (id) => ({
// 	type: REMOVE_GAME,
// 	id,
// });

// export const fiveRandomGames = () => async (dispatch) => {
// 	const response = await csrfFetch("/api/games/random");
// 	const data = await response.json();
// 	dispatch(addGames(data.games));
// 	return response;
// };

export const addImagesFromArr = (arr) => async (dispatch) => {
	const response = await csrfFetch("/api/images/arr", {
		method: "POST",
		body: JSON.stringify({
			arr,
		}),
	});
    const data = await response.json();
	if (data.skip) {
		return;
	}
	dispatch(addImages(data.images));
	return response;
};

const initialState = {};

function reducer(state = initialState, action) {
	// let newState;
	switch (action.type) {
		case ADD_IMAGES:
			const newImageState = { ...state };
			action.images.forEach((image) => {
				newImageState[image.id] = image;
			});
			return newImageState;
		// case REMOVE_USER:
		// 	newState = Object.assign({}, state, { user: null });
		// 	return newState;
		default:
			return state;
	}
}

export default reducer;
