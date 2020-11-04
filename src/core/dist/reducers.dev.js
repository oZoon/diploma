"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _records = _interopRequireDefault(require("lib/records"));

var _constants = require("lib/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var records = new _records["default"]();
var init = records.getRecord("diploma");

if (init === null) {
  init = {};
  init['user'] = {
    isLoggedIn: false,
    state: false,
    jsonToken: {},
    jsonProfile: {},
    error: false,
    code: false
  };
  init['search'] = {
    searchHistory: [],
    currentSearchString: false
  };
  init['searchPhotos'] = {};
  init['searchUsers'] = {};
  init['searchCollections'] = {};
  init['photosListPhotos'] = {
    state: false,
    json: {},
    error: ''
  };
  init['photosGetPhoto'] = {};
  init['photosGetPhotoStats'] = {};
  init['photosGetRandomPhoto'] = {
    state: false,
    json: {},
    error: '',
    imgUrl: false,
    show: false
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
  var newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case _constants.LOG_IN_START:
      newState.state = true;
      return newState;

    case _constants.LOG_IN_SUCCESS_CODE:
      newState.state = true;
      newState.code = action.code;
      return newState;

    case _constants.LOG_IN_SUCCESS_JSON_TOKEN_LOAD:
      newState.state = true;
      newState.jsonToken = action.json;
      return newState;

    case _constants.LOG_IN_SUCCESS_JSON_PROFILE_LOAD:
      newState.isLoggedIn = true;
      newState.state = false;
      newState.jsonProfile = action.json;
      return newState;

    case _constants.LOG_IN_ERROR:
      newState.isLoggedIn = false;
      newState.state = false;
      newState.error = action.err;
      return newState;

    case _constants.LOG_OUT:
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

function search(state, action) {
  return state; // const newState = JSON.parse(JSON.stringify(state));
  // switch (action.type) {
  //     case REQUEST_SEARCH:
  //         newState.currentSearchString = action.text;
  //         const searchResult = action.text;
  //         // const searchResult = action.unsplash.requestSearch(action.text);
  //         newState.searchHistory.push([action.text, searchResult]);
  //         return newState;
  //     default:
  //         return newState;
  // }
}

function photosGetRandomPhoto(state, action) {
  var newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case _constants.RANDOM_START_JSON_LOAD:
      newState.state = true;
      return newState;

    case _constants.RANDOM_SUCCESS_JSON_LOAD:
      newState.json = action.json;
      newState.imgUrl = action.json[0].urls.raw;
      newState.error = '';
      return newState;

    case _constants.RANDOM_ERROR_JSON_LOAD:
      newState.state = false;
      newState.json = {};
      newState.error = action.err;
      return newState;

    case _constants.RANDOM_SUCCESS_PHOTO_LOAD:
      newState.state = false;
      newState.error = '';
      return newState;

    case _constants.RANDOM_ERROR_PHOTO_LOAD:
      newState.state = false;
      newState.json = {};
      newState.error = action.err;
      return newState;

    case _constants.RANDOM_SHOW:
      newState.show = true;
      return newState;

    case _constants.RANDOM_HIDE:
      newState.show = false;
      return newState;

    default:
      return newState;
  }
}

function photosListPhotos(state, action) {
  var newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case _constants.LIST_PHOTOS_START_JSON_LOAD:
      newState.state = true;
      return newState;

    case _constants.LIST_PHOTOS_SUCCESS_JSON_LOAD:
      newState.state = false;
      newState.json = action.json;
      newState.error = '';
      return newState;

    case _constants.LIST_PHOTOS_ERROR_JSON_LOAD:
      newState.state = false;
      newState.json = {};
      newState.error = action.err;
      return newState;

    default:
      return newState;
  }
}

function reducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return {
    user: user(state.user, action),
    search: search(state.search, action),
    photosGetRandomPhoto: photosGetRandomPhoto(state.photosGetRandomPhoto, action),
    photosListPhotos: photosListPhotos(state.photosListPhotos, action)
  };
}

var _default = reducers;
exports["default"] = _default;