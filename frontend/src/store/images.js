import { csrfFetch } from "./csrf.js";

const ADD_IMAGES = "images/ADD_IMAGES";

const addImages = (images) => ({
	type: ADD_IMAGES,
	images,
});

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
	switch (action.type) {
		case ADD_IMAGES:
			const newImageState = { ...state };
			action.images.forEach((image) => {
				newImageState[image.id] = image;
			});
			return newImageState;
		default:
			return state;
	}
}

export default reducer;
