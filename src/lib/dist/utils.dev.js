"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseArrInThree = exports.checkCode = void 0;

var _constants = require("lib/constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var checkCode = function checkCode() {
  return location.search.includes('?code=') ? location.search.split('?code=')[1] : false;
};

exports.checkCode = checkCode;

var parseArrInThree = function parseArrInThree(sortedOld, arr) {
  var sorted = JSON.parse(JSON.stringify(sortedOld));
  var allID = [].concat(_toConsumableArray(sorted[0].arrID), _toConsumableArray(sorted[1].arrID), _toConsumableArray(sorted[1].arrID));
  var clearArr = arr.filter(function (item) {
    return !allID.includes(item.id);
  });
  clearArr.forEach(function (item) {
    var height = _constants.PHOTO_WIDTH * item.height / item.width;
    var heightMin = Math.min(sorted[0].height, sorted[1].height, sorted[2].height);
    var index;

    for (var i = 0; i < sorted.length; i++) {
      if (heightMin == sorted[i].height) {
        index = i;
        break;
      }
    }

    sorted[index].height = sorted[index].height + height;
    sorted[index].arrID.push(item.id);
    sorted[index].list.push(item);
  });
  return sorted;
};

exports.parseArrInThree = parseArrInThree;