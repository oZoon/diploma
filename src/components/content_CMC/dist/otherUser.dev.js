"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _column = _interopRequireDefault(require("content/column"));

var _utils = require("lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function OtherUser(props) {
  // console.log(props);
  // /user?profile=username
  // unsplash.users.profile("naoufal")
  //     .then(toJson)
  //     .then(json => {
  //         // Your code
  //     });
  // /user?photos=username
  // unsplash.users.photos("naoufal", 1, 10, "latest", { orientation: "landscape" })
  //     .then(toJson)
  //     .then(json => {
  //         // Your code
  //     });
  // /user?likes=username
  // unsplash.users.likes("naoufal", 2, 15, "latest", { orientation: "landscape" })
  // .then(toJson)
  // .then(json => {
  //   // Your code
  // });
  // /user?collections=username
  // unsplash.users.collections("naoufal", 2, 15, "updated")
  // .then(toJson)
  // .then(json => {
  //   // Your code
  // });
  var user = props.user,
      getUserData = props.getUserData,
      history = props.history,
      usersProfile = props.usersProfile;
  var username = (0, _utils.parseSearchString)(history.location.search)[1];
  (0, _react.useEffect)(function () {
    if (user.isLoggedIn && history.location.search && !usersProfile.state && !usersProfile.profile.usernames.includes(username)) getUserData(history, user);
  }, [!usersProfile.state, !usersProfile.profile.usernames.includes(username)]);
  return null;
}

var _default = OtherUser;
exports["default"] = _default;