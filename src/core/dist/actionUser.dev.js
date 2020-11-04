"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logOut = exports.continueLogIn = exports.logIn = void 0;

var _unsplashJs = _interopRequireWildcard(require("unsplash-js"));

var _constants = require("lib/constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var logIn = function logIn() {
  return function (dispatch) {
    dispatch(logInStart());
    var unsplash = new _unsplashJs["default"]({
      accessKey: _constants.ACCESS_KEY,
      secret: _constants.SECRET,
      callbackUrl: _constants.URL_SITE
    });
    var authenticationUrl = unsplash.auth.getAuthenticationUrl(["public", "write_likes"]);
    location.assign(authenticationUrl);
  };
};

exports.logIn = logIn;

var continueLogIn = function continueLogIn(code, history) {
  return function (dispatch) {
    dispatch(logInSuccessCode(code));
    var unsplash = new _unsplashJs["default"]({
      accessKey: _constants.ACCESS_KEY,
      secret: _constants.SECRET,
      callbackUrl: _constants.URL_SITE,
      bearerToken: code
    });
    unsplash.auth.userAuthentication(code).then(_unsplashJs.toJson).then(function (json) {
      if (json.access_token) {
        dispatch(logInSuccesToken(json));
        unsplash.auth.setBearerToken(json.access_token);
        unsplash.currentUser.profile().then(_unsplashJs.toJson).then(function (json) {
          dispatch(logInSuccessProfile(json));
          history.push('/', 'loggedIn');
        })["catch"](function (err) {
          dispatch(logInError(err));
        });
      } else {
        dispatch(logInError(err));
      }
    })["catch"](function (err) {
      dispatch(logInError(err));
    });
  };
};

exports.continueLogIn = continueLogIn;

var logOut = function logOut(history) {
  history.push('/', 'logOut');
  return {
    type: _constants.LOG_OUT
  };
};

exports.logOut = logOut;

var logInStart = function logInStart() {
  return {
    type: _constants.LOG_IN_START
  };
};

var logInSuccessCode = function logInSuccessCode(code) {
  return {
    type: _constants.LOG_IN_SUCCESS_CODE,
    code: code
  };
};

var logInSuccesToken = function logInSuccesToken(json) {
  return {
    type: _constants.LOG_IN_SUCCESS_JSON_TOKEN_LOAD,
    json: json
  };
};

var logInSuccessProfile = function logInSuccessProfile(json) {
  return {
    type: _constants.LOG_IN_SUCCESS_JSON_PROFILE_LOAD,
    json: json
  };
};

var logInError = function logInError(err) {
  return {
    type: _constants.LOG_IN_ERROR,
    err: err
  };
};