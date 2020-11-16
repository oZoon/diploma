"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserData = void 0;

var _unsplashJs = _interopRequireWildcard(require("unsplash-js"));

var _constants = require("lib/constants");

var _utils = require("lib/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getUserData = function getUserData(history, user) {
  var parsedSearchString = (0, _utils.parseSearchString)(history.location.search);
  return function (dispatch) {
    if (Array.isArray(parsedSearchString) && parsedSearchString.length == 2) {
      var unsplash = new _unsplashJs["default"]({
        accessKey: _constants.ACCESS_KEY,
        secret: _constants.SECRET,
        callbackUrl: _constants.URL_SITE,
        bearerToken: user.code
      });
      unsplash.auth.setBearerToken(user.jsonToken.access_token);

      switch (parsedSearchString[0]) {
        case 'profile':
          dispatch(getUserDataJsonLoad());
          unsplash.users.profile(parsedSearchString[1]).then(_unsplashJs.toJson).then(function (json) {
            console.log('profile: ', json);
            dispatch(getUserDataSuccessJsonLoadProfile(json));
          })["catch"](function (err) {
            dispatch(getUserDataError(err));
          });
          break;
        // case 'photos':
        //     const page = usersProfile.photos.page + 1;
        //     unsplash.users.photos(parsedSearchString[1], page, LIST_PHOTOS_COUNT, 'latest')
        //         .then(toJson)
        //         .then(json => {
        //             console.log('photos: ', json);
        //             const sorted = parseArrInThree(usersProfile.photos.sorted, json);
        //             dispatch(getUserDataSuccessJsonLoadPhotos(sorted, page))
        //         })
        //         .catch(err => {
        //             dispatch(getUserDataError(err))
        //         })
        // break;
        // case 'likes':
        //     unsplash.users.likes(parsedSearchString[1], 1, 10, 'latest')
        //         .then(toJson)
        //         .then(json => {
        //             console.log('likes: ', json);
        //             const sorted = sortUserPhotos(usersProfile.likes, json);
        //             dispatch(getUserDataSuccessJsonLoad(sorted, parsedSearchString[0]))
        //         })
        //         .catch(err => {
        //             dispatch(getUserDataError(err))
        //         })
        // break;
        // case 'collections':
        //     unsplash.users.collections(parsedSearchString[1], 1, 10, 'updated')
        //     .then(toJson)
        //     .then(json => {
        //         console.log('collections: ', json);
        //         dispatch(getUserDataSuccessJsonLoad(json, parsedSearchString[0]))
        //     })
        //     .catch(err => {
        //         dispatch(getUserDataError(err))
        //     })
        // break;
        // default:
        //     unsplash.users.profile(parsedSearchString[1])
        //     .then(toJson)
        //     .then(json => {
        //         dispatch(getUserDataSuccessJsonLoad(json, parsedSearchString[0]))
        //     })
        //     .catch(err => {
        //         dispatch(getUserDataError(err))
        //     })
        // break;
      }
    } else {
      dispatch(getUserDataError('errorSearchString'));
      history.push('/', 'errorSearchString');
    }
  };
};

exports.getUserData = getUserData;

var getUserDataJsonLoad = function getUserDataJsonLoad() {
  return {
    type: _constants.USER_START_JSON_LOAD
  };
};

var getUserDataSuccessJsonLoad = function getUserDataSuccessJsonLoad(json, variant) {
  return {
    type: _constants.USER_SUCCESS_JSON_LOAD,
    json: json,
    variant: variant
  };
};

var getUserDataSuccessJsonLoadProfile = function getUserDataSuccessJsonLoadProfile(json) {
  return {
    type: _constants.USER_SUCCESS_JSON_LOAD_PROFILE,
    json: json
  };
};

var getUserDataSuccessJsonLoadPhotos = function getUserDataSuccessJsonLoadPhotos(sorted, page) {
  return {
    type: _constants.USER_SUCCESS_JSON_LOAD_PHOTOS,
    sorted: sorted,
    page: page
  };
};

var getUserDataError = function getUserDataError(err) {
  return {
    type: _constants.USER_ERROR_JSON_LOAD,
    err: err
  };
};