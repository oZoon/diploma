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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getUserData = function getUserData(history, user, usersProfile) {
  var _parseSearchString = (0, _utils.parseSearchString)(history.location.search),
      _parseSearchString2 = _slicedToArray(_parseSearchString, 2),
      request = _parseSearchString2[0],
      username = _parseSearchString2[1];

  return function (dispatch) {
    if (request && username) {
      var unsplash = new _unsplashJs["default"]({
        accessKey: _constants.ACCESS_KEY,
        secret: _constants.SECRET,
        callbackUrl: _constants.URL_SITE,
        bearerToken: user.code
      });
      unsplash.auth.setBearerToken(user.jsonToken.access_token);
      var item, page, index, collection;

      switch (request) {
        case 'profile':
          dispatch(getUserDataJsonLoad());
          unsplash.users.profile(username).then(_unsplashJs.toJson).then(function (json) {
            dispatch(getUserDataSuccessJsonLoadProfile(json));
          })["catch"](function (err) {
            dispatch(getUserDataError(err));
          });
          break;

        case 'photos':
          dispatch(getUserDataJsonLoad());

          var _findArray = (0, _utils.findArray)(usersProfile.photos, username);

          var _findArray2 = _slicedToArray(_findArray, 3);

          item = _findArray2[0];
          page = _findArray2[1];
          index = _findArray2[2];
          page = page + 1;
          console.log([item, page, index]);
          unsplash.users.photos(username, page, _constants.LIST_PHOTOS_COUNT, 'latest').then(_unsplashJs.toJson).then(function (json) {
            var jsonNew = JSON.parse(JSON.stringify(json)); // console.log(jsonNew);
            // console.log(Object.keys(jsonNew).length);
            // Object.keys(jsonNew).length ? console.log('true') : console.log('false');

            if (Object.keys(jsonNew).length == 0) {
              console.log('Object.keys(jsonNew).length = 0');

              var _getCountUserPhotos = (0, _utils.getCountUserPhotos)(usersProfile, username),
                  _getCountUserPhotos2 = _slicedToArray(_getCountUserPhotos, 2),
                  photosCount = _getCountUserPhotos2[0],
                  photosShowed = _getCountUserPhotos2[1];

              console.log([photosCount, photosShowed]);

              var _index = (0, _utils.getUserIndex)(usersProfile, username);

              console.log(_index);
              dispatch(correctUserPhotosCount(photosShowed, _index));
            } else {
              var _parseArrInThree = (0, _utils.parseArrInThree)(item.ids, item.sorted, json),
                  _parseArrInThree2 = _slicedToArray(_parseArrInThree, 2),
                  ids = _parseArrInThree2[0],
                  sorted = _parseArrInThree2[1];

              console.log([ids, sorted]);
              var result = {
                username: username,
                page: page,
                ids: ids,
                sorted: sorted
              };
              console.log(result);
              dispatch(getUserDataSuccessJsonLoadPhotos(result, index));
            }
          })["catch"](function (err) {
            dispatch(getUserDataError(err));
          });
          break;
        // case 'likes':
        //     dispatch(getUserDataJsonLoad());
        //     [item, page, index] = findArray(usersProfile.likes, username);
        //     page = page + 1;
        //     unsplash.users.likes(username, page, LIST_PHOTOS_COUNT, 'latest')
        //         .then(toJson)
        //         .then(json => {
        //             const [ids, sorted] = parseArrInThree(item.ids, item.sorted, json);
        //             const result = {
        //                 username: username,
        //                 page: page,
        //                 ids: ids,
        //                 sorted: sorted,
        //             };
        //             dispatch(getUserDataSuccessJsonLoadLikes(result, index))
        //         })
        //         .catch(err => {
        //             dispatch(getUserDataError(err))
        //         })
        //     break;
        // case 'collections':
        //     dispatch(getUserDataJsonLoad());
        //     [collection, page, index] = findUserCollection(usersProfile.collections, username);
        //     console.log([collection, page, index]);
        //     page = page + 1;
        //     unsplash.users.collections(username, 1, LIST_COLLECTIONS_COUNT, 'updated')
        //         .then(toJson)
        //         .then(json => {
        //             console.log('collections: ', json);
        //             const [ids, list] = mergeCollection(collection.ids, collection.list, json);
        //             const result = {
        //                 username: username,
        //                 page: page,
        //                 ids: ids,
        //                 list: list,
        //             }
        //             console.log(result);
        //             dispatch(getUserDataSuccessJsonLoadCollections(result, index))
        //         })
        //         .catch(err => {
        //             dispatch(getUserDataError(err))
        //         })
        //     break;
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

var getUserDataSuccessJsonLoadProfile = function getUserDataSuccessJsonLoadProfile(json) {
  return {
    type: _constants.USER_SUCCESS_JSON_LOAD_PROFILE,
    json: json
  };
};

var getUserDataSuccessJsonLoadPhotos = function getUserDataSuccessJsonLoadPhotos(result, index) {
  return {
    type: _constants.USER_SUCCESS_JSON_LOAD_PHOTOS,
    result: result,
    index: index
  };
};

var getUserDataSuccessJsonLoadLikes = function getUserDataSuccessJsonLoadLikes(result, index) {
  return {
    type: _constants.USER_SUCCESS_JSON_LOAD_LIKES,
    result: result,
    index: index
  };
};

var getUserDataSuccessJsonLoadCollections = function getUserDataSuccessJsonLoadCollections(result, index) {
  return {
    type: _constants.USER_SUCCESS_JSON_LOAD_COLLECTIONS,
    result: result,
    index: index
  };
};

var getUserDataError = function getUserDataError(err) {
  return {
    type: _constants.USER_ERROR_JSON_LOAD,
    err: err
  };
};

var correctUserPhotosCount = function correctUserPhotosCount(photosShowed, index) {
  return {
    type: _constants.CORRECT_USER_PHOTOS_COUNT,
    photosShowed: photosShowed,
    index: index
  };
};