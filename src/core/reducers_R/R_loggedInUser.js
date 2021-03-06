import {
    LOG_IN_START,
    LOG_IN_SUCCESS_CODE,
    LOG_IN_SUCCESS_JSON_TOKEN_LOAD,
    LOG_IN_SUCCESS_JSON_PROFILE_LOAD,
    LOG_IN_ERROR,
    LOG_OUT,
} from "lib/constants";

function user(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case LOG_IN_START:
            newState.state = true;
            return newState;
        case LOG_IN_SUCCESS_CODE:
            newState.state = true;
            newState.code = action.code;
            return newState;
        case LOG_IN_SUCCESS_JSON_TOKEN_LOAD:
            newState.state = true;
            newState.jsonToken = action.json;
            return newState;
        case LOG_IN_SUCCESS_JSON_PROFILE_LOAD:
            newState.isLoggedIn = true;
            newState.state = false;
            newState.jsonProfile = action.json;
            return newState;
        case LOG_IN_ERROR:
            newState.isLoggedIn = false;
            newState.state = false;
            newState.error = action.err;
            return newState;
        case LOG_OUT:
            newState.isLoggedIn = false;
            newState.state = false;
            newState.jsonToken = {};
            newState.jsonProfile = {};
            newState.error = false;
            newState.code = false;
            return newState;
        default:
            return newState;
    }
}

export default user;
