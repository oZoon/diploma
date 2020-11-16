"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("lib/constants");

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

var _default = photosListPhotos;
exports["default"] = _default;