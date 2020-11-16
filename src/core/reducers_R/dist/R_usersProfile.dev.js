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
      newState.state = false;
      newState.profiles.userList.push(action.json);
      newState.profiles.usernames.push(action.json.username);
      newState.error = '';
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD_PHOTOS:
      console.log(action);
      newState.state = false;
      action.index === null ? newState.photos.push(action.result) : newState.photos.splice(action.index, 1, action.result);
      newState.error = '';
      console.log(newState);
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD_LIKES:
      newState.state = false;
      action.index == 0 ? newState.likes.push(action.result) : newState.likes.splice(action.index, 1, result);
      newState.error = '';
      return newState;

    case _constants.USER_SUCCESS_JSON_LOAD_COLLECTIONS:
      console.log(action);
      newState.state = false;
      action.index === null ? newState.collections.push(action.result) : newState.collections.splice(action.index, 1, result);
      newState.error = '';
      return newState;

    case _constants.USER_ERROR_JSON_LOAD:
      newState.state = true;
      newState.error = action.err;
      return newState;

    case _constants.CORRECT_USER_PHOTOS_COUNT:
      console.log(action);
      newState.state = false;
      newState.profiles.userList[action.index].total_photos = action.photosShowed;
      console.log(newState);
      return newState;

    case 'BROKEN':
      newState.state = false;
      return newState;

    default:
      return newState;
  }
}

var _default = usersProfile;
exports["default"] = _default;