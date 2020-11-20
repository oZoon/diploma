import {
    USER_START_JSON_LOAD,
    USER_SUCCESS_JSON_LOAD_PROFILE,
    USER_SUCCESS_JSON_LOAD_IMAGES,
    CORRECT_USER_IMAGES_COUNT,
    USER_ERROR_JSON_LOAD,

    USER_SUCCESS_JSON_LOAD_COLLECTIONS,
} from "lib/constants";

function usersProfile(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case USER_START_JSON_LOAD:
            newState.state = true;
            return newState;
        case USER_SUCCESS_JSON_LOAD_PROFILE:
            newState.state = false;
            if (!newState.profiles.usernames.includes(action.json.username)) {
                newState.profiles.userList.push(action.json);
                newState.profiles.usernames.push(action.json.username);
            }
            newState.error = '';
            return newState;
        case USER_SUCCESS_JSON_LOAD_IMAGES:
            newState.state = false;
            action.index === null ? newState[action.imageType].push(action.result) : newState[action.imageType].splice(action.index, 1, action.result);
            newState.error = '';
            return newState;
        case CORRECT_USER_IMAGES_COUNT:
            newState.state = false;
            newState.profiles.userList[action.index][`total_${action.imageType}`] = action.imageShowed;
            return newState;

        // case USER_SUCCESS_JSON_LOAD_COLLECTIONS:
        //     // console.log(action);
        //     newState.state = false;
        //     action.index === null ? newState.collections.push(action.result) : newState.collections.splice(action.index, 1, result);
        //     newState.error = '';
        //     return newState;
        case USER_ERROR_JSON_LOAD:
            newState.state = true;
            newState.error = action.err;
            return newState;
        case 'BROKEN':
            newState.state = false;
            return newState;
        default:
            return newState;
    }

}

export default usersProfile;
