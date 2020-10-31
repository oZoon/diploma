import Records from "lib/records";
import {
    LOG_IN,
    LOG_OUT,
    AUTH_UPDATE,
    REQUEST_SEARCH,

    RANDOM_START_JSON_LOAD,
    RANDOM_SUCCESS_JSON_LOAD,
    RANDOM_ERROR_JSON_LOAD,
    RANDOM_SUCCESS_PHOTO_LOAD,
    RANDOM_ERROR_PHOTO_LOAD,
    RANDOM_SHOW,
    RANDOM_HIDE,

    LIST_PHOTOS_START_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_JSON_LOAD,
    LIST_PHOTOS_ERROR_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_LIST_LOAD,
    LIST_PHOTOS_ERROR_LIST_LOAD,

} from "lib/constants";

let records = new Records();
let init = records.getRecord("diploma");
if (init === null) {
    init = {};
    init['user'] = {
        isLoggedIn: false,
        code: false,
        access_token: false,

        first_name: false,
        profile_image: false,
        id: false,
        username: false,
    };
    init['search'] = {
        searchHistory: [],
        currentSearchString: false,
    };
    init['searchPhotos'] = {};
    init['searchUsers'] = {};
    init['searchCollections'] = {};

    init['photosListPhotos'] = {
        state: false,
        json: {},
        error: '',
    };
    init['photosGetPhoto'] = {};
    init['photosGetPhotoStats'] = {};
    init['photosGetRandomPhoto'] = {
        state: false,
        json: {},
        error: '',
        imgUrl: false,
        show: false,
    };
    init['photosLikePhoto'] = {};
    init['photosUnlikePhoto'] = {};

    init['usersProfile'] = {};
    init['usersStatistics'] = {};
    init['usersPhotos'] = {};
    init['usersLikes'] = {};
    init['usersCollections'] = {};

    init['collectionsListCollections'] = {};
    init['collectionsGetCollection'] = {};
    init['collectionsGetCollectionPhotos'] = {};

    init['collectionsCreateCollection'] = {};
    init['collectionsUpdateCollection'] = {};
    init['collectionsDeleteCollection'] = {};
    init['collectionsAddPhotoToCollection'] = {};
    init['collectionsRemovePhotoFromCollection'] = {};
    init['collectionsListRelatedCollections'] = {};

    records.setRecord("diploma", init);
}

function user(state, action) {
    // console.log('state in userReducer: ', state);
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case AUTH_UPDATE:
            // console.log('in AUTH_UPDATE: ', action);
            newState.isLoggedIn = true;
            newState.code = action.userData.code;
            newState.access_token = action.userData.access_token;

            newState.first_name = action.userData.first_name;
            newState.profile_image = action.userData.profile_image;
            newState.id = action.userData.id;
            newState.username = action.userData.username;
            return newState;
        case LOG_IN:
            action.unsplash.auth();
            return newState;
        case LOG_OUT:
            newState.isLoggedIn = false;
            newState.code = false;
            newState.access_token = false;

            newState.first_name = false;
            newState.profile_image = false;
            newState.id = false;
            newState.username = false;
            return newState;
        default:
            return newState;
    }
}
function search(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case REQUEST_SEARCH:
            newState.currentSearchString = action.text;
            const searchResult = action.text;
            // const searchResult = action.unsplash.requestSearch(action.text);
            newState.searchHistory.push([action.text, searchResult]);
            return newState;
        default:
            return newState;
    }
}
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
function photosListPhotos(state, action){
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case LIST_PHOTOS_START_JSON_LOAD:
            newState.state = true;
            return newState;
        case LIST_PHOTOS_SUCCESS_JSON_LOAD:
            newState.state = false;
            newState.json = action.json;
            newState.error = '';
            return newState;
        case LIST_PHOTOS_ERROR_JSON_LOAD:
            newState.state = false;
            newState.json = {};
            newState.error = action.err;
            return newState;
        default:
            return newState;
    }
}

function reducers(state = init, action) {
    return {
        user: user(state.user, action),
        search: search(state.search, action),
        photosGetRandomPhoto: photosGetRandomPhoto(state.photosGetRandomPhoto, action),
        photosListPhotos: photosListPhotos(state.photosListPhotos, action),
    };
}

export default reducers;
