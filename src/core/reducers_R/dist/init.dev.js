"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _records = _interopRequireDefault(require("lib/records"));

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
var _default = init;
exports["default"] = _default;