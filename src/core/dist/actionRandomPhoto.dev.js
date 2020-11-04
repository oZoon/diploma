"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomMouseOut = exports.randomMouseOver = exports.getRandomPhoto = void 0;

var _unsplashJs = _interopRequireWildcard(require("unsplash-js"));

var _constants = require("lib/constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getRandomPhoto = function getRandomPhoto(user) {
  return function (dispatch) {
    dispatch(randomStartJsonLoad());
    var unsplash = new _unsplashJs["default"]({
      accessKey: _constants.ACCESS_KEY,
      secret: _constants.SECRET,
      callbackUrl: _constants.URL_SITE,
      bearerToken: user.code
    });
    unsplash.auth.setBearerToken(user.jsonToken.access_token);
    unsplash.photos.getRandomPhoto({
      count: '1'
    }).then(_unsplashJs.toJson).then(function (json) {
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