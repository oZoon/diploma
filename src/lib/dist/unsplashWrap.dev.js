"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _unsplashJs = _interopRequireWildcard(require("unsplash-js"));

var _constants = require("lib/constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UnsplashWrap =
/*#__PURE__*/
function () {
  function UnsplashWrap(props) {
    _classCallCheck(this, UnsplashWrap);

    var unsplashInit = {
      accessKey: _constants.ACCESS_KEY,
      secret: _constants.SECRET,
      callbackUrl: _constants.URL_SITE
    };

    if (!props) {
      unsplashInit.bearerToken = props;
    }

    this.unsplash = new _unsplashJs["default"](unsplashInit);
    this.authenticationUrl = this.unsplash.auth.getAuthenticationUrl(["public", "write_likes"]);
  }

  _createClass(UnsplashWrap, [{
    key: "auth",
    value: function auth() {
      if (!this.authCheckCode()) {
        this.authGetCode();
      }
    }
  }, {
    key: "authGetCode",
    value: function authGetCode() {
      location.assign(this.authenticationUrl);
    }
  }, {
    key: "authCheckCode",
    value: function authCheckCode() {
      if (location.search) {
        if (location.search.includes("code=")) {
          return location.search.split("code=")[1];
        } else {
          return false;
        }
      }
    }
  }, {
    key: "logInUpdate",
    value: function logInUpdate(authUpdate, user) {
      var _this = this;

      if (!user.isLoggedIn) {
        var code = this.authCheckCode();

        if (code) {
          if (!user.access_token) {
            this.unsplash.auth.userAuthentication(code).then(_unsplashJs.toJson).then(function (json) {
              if (json.access_token) {
                var access_token = json.access_token;

                _this.unsplash.auth.setBearerToken(json.access_token);

                _this.unsplash.currentUser.profile().then(_unsplashJs.toJson).then(function (json) {
                  // console.log('json in logInUpdate: ', json);
                  var userData = {
                    code: code,
                    access_token: access_token,
                    first_name: json.first_name,
                    profile_image: json.profile_image.medium,
                    id: json.id,
                    username: json.username
                  };
                  authUpdate(_objectSpread({}, userData));
                  history.pushState(_objectSpread({}, userData), 'loggedIn', _constants.URL_SITE);
                });
              } else {// error - invalid code
              }
            });
          }
        }
      }
    }
  }, {
    key: "getRandomPhoto",
    value: function getRandomPhoto() {
      // console.log(this.unsplash);
      return this.unsplash.photos.getRandomPhoto({
        count: '1'
      });
    }
  }, {
    key: "getListPhotos",
    value: function getListPhotos(page) {
      return this.unsplash.photos.listPhotos(page, 10, "latest");
    }
  }]);

  return UnsplashWrap;
}();

var _default = UnsplashWrap;
exports["default"] = _default;