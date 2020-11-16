"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CMC_userHeader = _interopRequireDefault(require("content/CMC_userHeader"));

var _utils = require("lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function OtherUser(props) {
  var _console;

  var user = props.user,
      getUserData = props.getUserData,
      history = props.history,
      usersProfile = props.usersProfile,
      broken = props.broken;

  var _parseSearchString = (0, _utils.parseSearchString)(history.location.search),
      _parseSearchString2 = _slicedToArray(_parseSearchString, 2),
      request = _parseSearchString2[0],
      username = _parseSearchString2[1]; // profile


  if (request == 'profile') {
    (0, _react.useEffect)(function () {
      if (user.isLoggedIn && !usersProfile.state && !usersProfile.profiles.usernames.includes(username)) getUserData(history, user);
    });
  } // photos


  if (request == 'photos') {
    // if(usersProfile.state){
    //     broken();
    // }
    var _useState = (0, _react.useState)(0),
        _useState2 = _slicedToArray(_useState, 2),
        currentScroll = _useState2[0],
        setCurrentScroll = _useState2[1];

    var movedArea = document.body.scrollHeight - document.body.clientHeight;
    (0, _react.useEffect)(function () {
      window.onscroll = function () {
        setCurrentScroll(window.pageYOffset);
      };
    }, [window.pageYOffset]);
    (0, _react.useEffect)(function () {
      if (user.isLoggedIn && !usersProfile.state && (0, _utils.checkTape)(usersProfile.photos, movedArea, currentScroll, username)) getUserData(history, user, usersProfile);
    });
  } // likes


  if (request == 'likes') {
    // if(usersProfile.state){
    //     broken();
    // }
    var _useState3 = (0, _react.useState)(0),
        _useState4 = _slicedToArray(_useState3, 2),
        _currentScroll = _useState4[0],
        _setCurrentScroll = _useState4[1];

    var _movedArea = document.body.scrollHeight - document.body.clientHeight;

    (0, _react.useEffect)(function () {
      window.onscroll = function () {
        _setCurrentScroll(window.pageYOffset);
      };
    }, [window.pageYOffset]);
    (0, _react.useEffect)(function () {
      if (user.isLoggedIn && !usersProfile.state && (0, _utils.checkTape)(usersProfile.likes, _movedArea, _currentScroll, username)) getUserData(history, user, usersProfile);
    });
  } // collection


  if (request == 'collections') {
    // if (usersProfile.state) {
    //     broken();
    // }
    (0, _react.useEffect)(function () {
      if (user.isLoggedIn && !usersProfile.state && !(0, _utils.checkUserCollection)(usersProfile.collections, username)) {
        console.log('collections triggered');
        getUserData(history, user, usersProfile);
      }
    });
  }

  var profile = null;

  (_console = console).log.apply(_console, [username].concat(_toConsumableArray(usersProfile.profiles.userList))); // console.log(...[username, ...usersProfile.profiles]);
  // if (user.isLoggedIn) {
  //     profile = (
  //         <>
  //             <UserHeader {...[username, ...usersProfile.profiles]} />
  //         </>
  //     )
  // }
  // return profile;
  // const propsHeader = getProfileHeader(usersProfile, username);
  // return (
  //     <UserHeader {...propsHeader} />
  // )


  return null;
}

var _default = OtherUser;
exports["default"] = _default;