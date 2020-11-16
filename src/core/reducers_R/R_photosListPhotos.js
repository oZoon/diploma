import {
    LIST_PHOTOS_START_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_JSON_LOAD,
    LIST_PHOTOS_ERROR_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_LIST_LOAD,
    LIST_PHOTOS_ERROR_LIST_LOAD,
} from "lib/constants";

function photosListPhotos(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case LIST_PHOTOS_START_JSON_LOAD:
            newState.state = true;
            return newState;
        case LIST_PHOTOS_SUCCESS_JSON_LOAD:
            console.log(action.sorted);
            newState.state = false;
            newState.ids = action.ids;
            newState.sorted = action.sorted;
            newState.page = action.page;
            newState.error = '';
            return newState;
        case LIST_PHOTOS_ERROR_JSON_LOAD:
            console.log(action);
            newState.state = false;
            newState.error = action.err;
            return newState;
        default:
            return newState;
    }
}

export default photosListPhotos;
