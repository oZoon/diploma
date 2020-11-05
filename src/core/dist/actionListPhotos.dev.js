"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextPageListPhotos = void 0;

var _unsplashJs = _interopRequireWildcard(require("unsplash-js"));

var _constants = require("lib/constants");

var _utils = require("lib/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var nextPageListPhotos = function nextPageListPhotos(user, photosListPhotos) {
  return function (dispatch) {
    dispatch(listPhotosStartJsonLoad());
    var unsplash = new _unsplashJs["default"]({
      accessKey: _constants.ACCESS_KEY,
      secret: _constants.SECRET,
      callbackUrl: _constants.URL_SITE,
      bearerToken: user.code
    });
    unsplash.auth.setBearerToken(user.jsonToken.access_token);
    var page = photosListPhotos.page + 1;
    unsplash.photos.listPhotos(page, _constants.LIST_PHOTOS_COUNT, "latest").then(_unsplashJs.toJson).then(function (json) {
      var sorted = (0, _utils.parseArrInThree)(photosListPhotos.sorted, json);
      dispatch(listPhotosSuccessJsonLoad(sorted, page));
    })["catch"](function (err) {
      dispatch(listPhotosErrorJsonLoad(err));
    });
  };
};

exports.nextPageListPhotos = nextPageListPhotos;

var listPhotosStartJsonLoad = function listPhotosStartJsonLoad() {
  return {
    type: _constants.LIST_PHOTOS_START_JSON_LOAD
  };
};

var listPhotosSuccessJsonLoad = function listPhotosSuccessJsonLoad(sorted, page) {
  return {
    type: _constants.LIST_PHOTOS_SUCCESS_JSON_LOAD,
    sorted: sorted,
    page: page
  };
};

var listPhotosErrorJsonLoad = function listPhotosErrorJsonLoad(err) {
  return {
    type: _constants.LIST_PHOTOS_ERROR_JSON_LOAD,
    err: err
  };
};