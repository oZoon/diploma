"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("lib/constants");

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

var _default = photosGetRandomPhoto;
exports["default"] = _default;