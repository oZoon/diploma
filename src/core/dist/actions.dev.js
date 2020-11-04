"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listPhotos = exports.randomMouseOut = exports.randomMouseOver = exports.getRandomPhoto = exports.requestSearch = exports.authUpdate = exports.logOut = exports.continueLogIn = exports.logIn = void 0;

var _unsplashJs = _interopRequireWildcard(require("unsplash-js"));

var _constants = require("lib/constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var logIn = function logIn() {
  return function (dispatch) {
    dispatch(logInStart());
    var unsplash = new _unsplashJs["default"]({
      accessKey: _constants.ACCESS_KEY,
      secret: _constants.SECRET,
      callbackUrl: _constants.URL_SITE
    });
    var authenticationUrl = unsplash.auth.getAuthenticationUrl(["public", "write_likes"]);
    location.assign(authenticationUrl);
  };
};

exports.logIn = logIn;

var logInStart = function logInStart() {
  return {
    type: _constants.LOG_IN_START
  };
};

var continueLogIn = function continueLogIn(code, history) {
  return function (dispatch) {
    dispatch(logInSuccessCode(code));
    var unsplash = new _unsplashJs["default"]({
      accessKey: _constants.ACCESS_KEY,
      secret: _constants.SECRET,
      callbackUrl: _constants.URL_SITE,
      bearerToken: code
    });
    unsplash.auth.userAuthentication(code).then(_unsplashJs.toJson).then(function (json) {
      if (json.access_token) {
        dispatch(logInSuccesToken(json));
        unsplash.auth.setBearerToken(json.access_token);
        unsplash.currentUser.profile().then(_unsplashJs.toJson).then(function (json) {
          dispatch(logInSuccessProfile(json));
          history.push('/', 'loggedIn');
        })["catch"](function (err) {
          dispatch(logInError(err));
        });
      } else {
        dispatch(logInError(err));
      }
    })["catch"](function (err) {
      dispatch(logInError(err));
    });
  };
};

exports.continueLogIn = continueLogIn;

var logInSuccessCode = function logInSuccessCode(code) {
  return {
    type: _constants.LOG_IN_SUCCESS_CODE,
    code: code
  };
};

var logInSuccesToken = function logInSuccesToken(json) {
  return {
    type: _constants.LOG_IN_SUCCESS_JSON_TOKEN_LOAD,
    json: json
  };
};

var logInSuccessProfile = function logInSuccessProfile(json) {
  return {
    type: _constants.LOG_IN_SUCCESS_JSON_PROFILE_LOAD,
    json: json
  };
};

var logInError = function logInError(err) {
  return {
    type: _constants.LOG_IN_ERROR,
    err: err
  };
};

var logOut = function logOut(history) {
  history.push('/', 'logOut');
  return {
    type: _constants.LOG_OUT
  };
};

exports.logOut = logOut;

var authUpdate = function authUpdate(userData) {
  return {
    type: AUTH_UPDATE,
    userData: userData
  };
};

exports.authUpdate = authUpdate;

var requestSearch = function requestSearch(text, unsplash) {
  return {
    type: REQUEST_SEARCH,
    text: text,
    unsplash: unsplash
  };
};

exports.requestSearch = requestSearch;

var getRandomPhoto = function getRandomPhoto(unsplash) {
  return function (dispatch) {
    dispatch(randomStartJsonLoad());
    unsplash.getRandomPhoto().then(_unsplashJs.toJson).then(function (json) {
      dispatch(randomSuccessJsonLoad(json));
      var img = new Image();
      img.src = json[0].urls.raw;

      img.onload = function () {
        return dispatch(randomSuccessPhotoLoad());
      };

      img.onerror = function (err) {
        return dispatch(randomErrorPhotoLoad(err));
      };
    })["catch"](function (err) {
      dispatch(randomErrorJsonLoad(err));
    });
  };
};

exports.getRandomPhoto = getRandomPhoto;

var randomStartJsonLoad = function randomStartJsonLoad() {
  return {
    type: _constants.RANDOM_START_JSON_LOAD
  };
};

var randomSuccessJsonLoad = function randomSuccessJsonLoad(json) {
  return {
    type: _constants.RANDOM_SUCCESS_JSON_LOAD,
    json: json
  };
};

var randomErrorJsonLoad = function randomErrorJsonLoad(err) {
  return {
    type: _constants.RANDOM_ERROR_JSON_LOAD,
    err: err
  };
};

var randomSuccessPhotoLoad = function randomSuccessPhotoLoad() {
  return {
    type: _constants.RANDOM_SUCCESS_PHOTO_LOAD
  };
};

var randomErrorPhotoLoad = function randomErrorPhotoLoad(err) {
  return {
    type: _constants.RANDOM_ERROR_PHOTO_LOAD,
    err: err
  };
};

var randomMouseOver = function randomMouseOver() {
  return {
    type: _constants.RANDOM_SHOW
  };
};

exports.randomMouseOver = randomMouseOver;

var randomMouseOut = function randomMouseOut() {
  return {
    type: _constants.RANDOM_HIDE
  };
};

exports.randomMouseOut = randomMouseOut;

var listPhotos = function listPhotos(unsplash) {
  return function (dispatch) {
    dispatch(listPhotosStartJsonLoad());
    unsplash.getListPhotos(1).then(_unsplashJs.toJson).then(function (json) {
      console.log(json);
      dispatch(listPhotosSuccessJsonLoad(json));
    })["catch"](function (err) {
      dispatch(listPhotosErrorJsonLoad(err));
    });
  };
};

exports.listPhotos = listPhotos;

var listPhotosStartJsonLoad = function listPhotosStartJsonLoad() {
  return {
    type: _constants.LIST_PHOTOS_START_JSON_LOAD
  };
};

var listPhotosSuccessJsonLoad = function listPhotosSuccessJsonLoad(json) {
  return {
    type: _constants.LIST_PHOTOS_SUCCESS_JSON_LOAD,
    json: json
  };
};

var listPhotosErrorJsonLoad = function listPhotosErrorJsonLoad(err) {
  return {
    type: _constants.LIST_PHOTOS_ERROR_JSON_LOAD,
    err: err
  };
};