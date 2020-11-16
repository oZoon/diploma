import {
    RANDOM_START_JSON_LOAD,
    RANDOM_SUCCESS_JSON_LOAD,
    RANDOM_ERROR_JSON_LOAD,
    RANDOM_SUCCESS_PHOTO_LOAD,
    RANDOM_ERROR_PHOTO_LOAD,
    RANDOM_SHOW,
    RANDOM_HIDE,
} from "lib/constants";

function photosGetRandomPhoto(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case RANDOM_START_JSON_LOAD:
            newState.state = true;
            return newState;
        case RANDOM_SUCCESS_JSON_LOAD:
            newState.json = action.json;
            newState.imgUrl = action.json[0].urls.raw;
            newState.error = '';
            return newState;
        case RANDOM_ERROR_JSON_LOAD:
            newState.state = false;
            newState.json = {};
            newState.error = action.err;
            return newState;
        case RANDOM_SUCCESS_PHOTO_LOAD:
            newState.state = false;
            newState.error = '';
            return newState;
        case RANDOM_ERROR_PHOTO_LOAD:
            newState.state = false;
            newState.json = {};
            newState.error = action.err;
            return newState;
        case RANDOM_SHOW:
            newState.show = true;
            return newState;
        case RANDOM_HIDE:
            newState.show = false;
            return newState;
        default:
            return newState;
    }
}

export default photosGetRandomPhoto;
