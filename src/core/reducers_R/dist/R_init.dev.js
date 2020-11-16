"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _records = _interopRequireDefault(require("lib/records"));

var _constants = require("lib/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var init = {}; // init['searchPhotos'] = {};
// init['searchUsers'] = {};
// init['searchCollections'] = {};
// init['photosGetPhoto'] = {};
// init['photosGetPhotoStats'] = {};
// init['photosLikePhoto'] = {};
// init['photosUnlikePhoto'] = {};
// init['collectionsListCollections'] = {};
// init['collectionsGetCollection'] = {};
// init['collectionsGetCollectionPhotos'] = {};
// init['collectionsCreateCollection'] = {};
// init['collectionsUpdateCollection'] = {};
// init['collectionsDeleteCollection'] = {};
// init['collectionsAddPhotoToCollection'] = {};
// init['collectionsRemovePhotoFromCollection'] = {};
// init['collectionsListRelatedCollections'] = {};

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
init['photosListPhotos'] = {
  state: false,
  error: '',
  page: 0,
  ids: [],
  sorted: [{
    height: 0,
    list: []
  }, {
    height: 0,
    list: []
  }, {
    height: 0,
    list: []
  }]
};
init['photosGetRandomPhoto'] = {
  state: false,
  json: {},
  error: '',
  imgUrl: false,
  show: false
};
init['usersProfile'] = {
  state: false,
  profiles: {
    usernames: [null],
    userList: [{
      username: null
    }]
  },
  photos: [{
    username: null,
    page: 0,
    ids: [],
    sorted: [{
      height: 0,
      list: []
    }, {
      height: 0,
      list: []
    }, {
      height: 0,
      list: []
    }]
  }],
  statistics: [{
    username: null,
    statistic: {}
  }],
  likes: [{
    username: false,
    page: 0,
    ids: [],
    sorted: [{
      height: 0,
      list: []
    }, {
      height: 0,
      list: []
    }, {
      height: 0,
      list: []
    }]
  }],
  collections: [{
    username: false,
    page: 0,
    ids: [],
    list: []
  }],
  error: ''
};
var records = new _records["default"]();
var initLocalStorage = records.getRecord("diploma".concat(_constants.VERSION));

if (initLocalStorage !== null) {
  for (var key in init) {
    if (initLocalStorage[key]) {
      init[key] = initLocalStorage[key];
    }
  }
}

records.setRecord("diploma".concat(_constants.VERSION), init);
var _default = init; // if (initLocalStorage !== null) {
//     init = compareObjects(init, initLocalStorage)
// }
// records.setRecord("diploma", init);
// function compareObjects(obj1, obj2) {
//     let result = {};
//     for (let key in obj1) {
//         if (obj2[key]) {
//             if ('object' === typeof obj1[key] || 'array' === typeof obj1[key]) {
//                 result[key] = compareObjects(obj1[key], obj2[key]);
//             } else {
//                 result[key] = obj2[key];
//             }
//         } else {
//             result[key] = obj1[key];
//         }
//     }
//     return result;
// }

exports["default"] = _default;