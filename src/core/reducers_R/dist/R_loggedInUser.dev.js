"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("lib/constants");

function user(state, action) {
  var newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case _constants.LOG_IN_START:
      newState.state = true;
      return newState;

    case _constants.LOG_IN_SUCCESS_CODE:
      newState.state = true;
      newState.code = action.code;
      return newState;

    case _constants.LOG_IN_SUCCESS_JSON_TOKEN_LOAD:
      newState.state = true;
      newState.jsonToken = action.json;
      return newState;

    case _constants.LOG_IN_SUCCESS_JSON_PROFILE_LOAD:
      newState.isLoggedIn = true;
      newState.state = false;
      newState.jsonProfile = action.json;
      return newState;

    case _constants.LOG_IN_ERROR:
      newState.isLoggedIn = false;
      newState.state = false;
      newState.error = action.err;
      return newState;

    case _constants.LOG_OUT:
      newState.isLoggedIn = false;
      newState.state = false;
      newState.jsonToken = {};
      newState.jsonProfile = {};
      newState.error = false;
      newState.code = false;
      return newState;

    default:
      return newState;
  }
}

var _default = user;
exports["default"] = _default;