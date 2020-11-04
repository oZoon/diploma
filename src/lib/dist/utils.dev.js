"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCode = void 0;

var checkCode = function checkCode() {
  return location.search.includes('?code=') ? location.search.split('?code=')[1] : false;
};

exports.checkCode = checkCode;