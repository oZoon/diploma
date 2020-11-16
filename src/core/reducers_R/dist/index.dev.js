"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _R_init = _interopRequireDefault(require("reducers/R_init"));

var _R_usersProfile = _interopRequireDefault(require("reducers/R_usersProfile"));

var _R_loggedInUser = _interopRequireDefault(require("reducers/R_loggedInUser"));

var _R_search = _interopRequireDefault(require("reducers/R_search"));

var _R_photosGetRandomPhoto = _interopRequireDefault(require("reducers/R_photosGetRandomPhoto"));

var _R_photosListPhotos = _interopRequireDefault(require("reducers/R_photosListPhotos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function reducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _R_init["default"];
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return {
    user: (0, _R_loggedInUser["default"])(state.user, action),
    search: (0, _R_search["default"])(state.search, action),
    photosGetRandomPhoto: (0, _R_photosGetRandomPhoto["default"])(state.photosGetRandomPhoto, action),
    photosListPhotos: (0, _R_photosListPhotos["default"])(state.photosListPhotos, action),
    usersProfile: (0, _R_usersProfile["default"])(state.usersProfile, action)
  };
}

var _default = reducers;
exports["default"] = _default;