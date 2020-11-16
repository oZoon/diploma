"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("lib/constants");

function usersProfile(state, action) {
  var newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case _constants.USER_START_JSON_LOAD:
      newState.state = true;
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD_PROFILE:
      console.log(action.json);
      newState.state = false;
      newState.profile.userList.push(action.json);
      newState.profile.usernames.push(action.json.username);
      newState.error = '';
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD_PHOTOS:
      newState.state = false;
      newState.photos.sorted = action.sorted;
      newState.photos.page = action.page;
      newState.error = '';
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD:
      newState.state = false;
      newState[action.variant].push(action.json);
      newState.error = '';
      return newState;

    case _constants.USER_ERROR_JSON_LOAD:
      newState.state = true;
      newState.json = {};
      newState.error = action.err;
      return newState;

    default:
      return newState;
  }
}

var _default = usersProfile;
exports["default"] = _default;