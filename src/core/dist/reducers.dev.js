"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _records = _interopRequireDefault(require("lib/records"));

var _constants = require("lib/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var init = {};
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
}; // init['searchPhotos'] = {};
// init['searchUsers'] = {};
// init['searchCollections'] = {};

init['photosListPhotos'] = {
  state: false,
  error: '',
  page: 0,
  sorted: [{
    height: 0,
    arrID: [],
    list: []
  }, {
    height: 0,
    arrID: [],
    list: []
  }, {
    height: 0,
    arrID: [],
    list: []
  }]
}; // init['photosGetPhoto'] = {};
// init['photosGetPhotoStats'] = {};

init['photosGetRandomPhoto'] = {
  state: false,
  json: {},
  error: '',
  imgUrl: false,
  show: false
}; // init['photosLikePhoto'] = {};
// init['photosUnlikePhoto'] = {};

init['usersProfile'] = {
  state: false,
  profile: {
    usernames: [],
    userList: []
  },
  statistics: [],
  photos: {
    page: 0,
    sorted: [{
      height: 0,
      arrID: [],
      list: []
    }, {
      height: 0,
      arrID: [],
      list: []
    }, {
      height: 0,
      arrID: [],
      list: []
    }]
  },
  likes: [],
  collections: [],
  error: ''
}; // init['collectionsListCollections'] = {};
// init['collectionsGetCollection'] = {};
// init['collectionsGetCollectionPhotos'] = {};
// init['collectionsCreateCollection'] = {};
// init['collectionsUpdateCollection'] = {};
// init['collectionsDeleteCollection'] = {};
// init['collectionsAddPhotoToCollection'] = {};
// init['collectionsRemovePhotoFromCollection'] = {};
// init['collectionsListRelatedCollections'] = {};

var records = new _records["default"]();
var initLocalStorage = records.getRecord("diploma");

if (initLocalStorage !== null) {
  for (var key in init) {
    if (initLocalStorage[key]) {
      init[key] = initLocalStorage[key];
    }
  }
}

records.setRecord("diploma", init);

function usersProfile(state, action) {
  var newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case _constants.USER_START_JSON_LOAD:
      newState.state = true;
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD_PROFILE:
      console.log(action.json);
      newState.state = false;
      newState.profile.userList.push(action.json);
      newState.profile.usernames.push(action.json.username);
      newState.error = '';
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD_PHOTOS:
      newState.state = false;
      newState.photos.sorted = action.sorted;
      newState.photos.page = action.page;
      newState.error = '';
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD:
      newState.state = false;
      newState[action.variant].push(action.json);
      newState.error = '';
      return newState;

    case _constants.USER_ERROR_JSON_LOAD:
      newState.state = true;
      newState.json = {};
      newState.error = action.err;
      return newState;

    default:
      return newState;
  }
}

function user(state, action) {
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
      newState.sorted = action.sorted;
      newState.page = action.page;
      newState.error = '';
      return newState;

    case _constants.LIST_PHOTOS_ERROR_JSON_LOAD:
      newState.state = false;
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
    photosListPhotos: photosListPhotos(state.photosListPhotos, action),
    usersProfile: usersProfile(state.usersProfile, action)
  };
}

var _default = reducers;
exports["default"] = _default;