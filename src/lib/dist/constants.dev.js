"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PHOTO_WIDTH = exports.LIST_PHOTOS_COUNT = exports.REST_PAGE_SCROLL = exports.LIST_PHOTOS_ERROR_LIST_LOAD = exports.LIST_PHOTOS_SUCCESS_LIST_LOAD = exports.LIST_PHOTOS_ERROR_JSON_LOAD = exports.LIST_PHOTOS_SUCCESS_JSON_LOAD = exports.LIST_PHOTOS_START_JSON_LOAD = exports.RANDOM_HIDE = exports.RANDOM_SHOW = exports.RANDOM_ERROR_PHOTO_LOAD = exports.RANDOM_SUCCESS_PHOTO_LOAD = exports.RANDOM_ERROR_JSON_LOAD = exports.RANDOM_SUCCESS_JSON_LOAD = exports.RANDOM_START_JSON_LOAD = exports.LOG_OUT = exports.LOG_IN_ERROR = exports.LOG_IN_SUCCESS_JSON_PROFILE_LOAD = exports.LOG_IN_SUCCESS_JSON_TOKEN_LOAD = exports.LOG_IN_SUCCESS_CODE = exports.LOG_IN_START = exports.URL_DIPLOMA = exports.URL_AUTHOR = exports.URL_HOME = exports.SECRET = exports.ACCESS_KEY = exports.VERSION = exports.URL_SITE = void 0;
var url_site = 'http://localhost:8080';
var hostname = window && window.location && window.location.hostname;

if (hostname != 'localhost') {
  url_site = "http://".concat(hostname);
}

var URL_SITE = url_site;
exports.URL_SITE = URL_SITE;
var VERSION = '4.1.0';
exports.VERSION = VERSION;
var ACCESS_KEY = 'KVx67XvmzAv0NWFzGhl02RT3YJ0kXfNhhffCmc6V2Vk';
exports.ACCESS_KEY = ACCESS_KEY;
var SECRET = 'NEbVoZN0xAL1MJkl9GCIfHmud75H71MjACB2fo0UdiU';
exports.SECRET = SECRET;
var URL_HOME = '/';
exports.URL_HOME = URL_HOME;
var URL_AUTHOR = '/author';
exports.URL_AUTHOR = URL_AUTHOR;
var URL_DIPLOMA = '/diploma';
exports.URL_DIPLOMA = URL_DIPLOMA;
var LOG_IN_START = 'LOG_IN_START';
exports.LOG_IN_START = LOG_IN_START;
var LOG_IN_SUCCESS_CODE = 'LOG_IN_SUCCESS_CODE';
exports.LOG_IN_SUCCESS_CODE = LOG_IN_SUCCESS_CODE;
var LOG_IN_SUCCESS_JSON_TOKEN_LOAD = 'LOG_IN_SUCCESS_JSON_TOKEN_LOAD';
exports.LOG_IN_SUCCESS_JSON_TOKEN_LOAD = LOG_IN_SUCCESS_JSON_TOKEN_LOAD;
var LOG_IN_SUCCESS_JSON_PROFILE_LOAD = 'LOG_IN_SUCCESS_JSON_PROFILE_LOAD';
exports.LOG_IN_SUCCESS_JSON_PROFILE_LOAD = LOG_IN_SUCCESS_JSON_PROFILE_LOAD;
var LOG_IN_ERROR = 'LOG_IN_ERROR';
exports.LOG_IN_ERROR = LOG_IN_ERROR;
var LOG_OUT = 'LOG_OUT';
exports.LOG_OUT = LOG_OUT;
var RANDOM_START_JSON_LOAD = 'RANDOM_START_JSON_LOAD';
exports.RANDOM_START_JSON_LOAD = RANDOM_START_JSON_LOAD;
var RANDOM_SUCCESS_JSON_LOAD = 'RANDOM_SUCCESS_JSON_LOAD';
exports.RANDOM_SUCCESS_JSON_LOAD = RANDOM_SUCCESS_JSON_LOAD;
var RANDOM_ERROR_JSON_LOAD = 'RANDOM_ERROR_JSON_LOAD';
exports.RANDOM_ERROR_JSON_LOAD = RANDOM_ERROR_JSON_LOAD;
var RANDOM_SUCCESS_PHOTO_LOAD = 'RANDOM_SUCCESS_PHOTO_LOAD';
exports.RANDOM_SUCCESS_PHOTO_LOAD = RANDOM_SUCCESS_PHOTO_LOAD;
var RANDOM_ERROR_PHOTO_LOAD = 'RANDOM_ERROR_PHOTO_LOAD';
exports.RANDOM_ERROR_PHOTO_LOAD = RANDOM_ERROR_PHOTO_LOAD;
var RANDOM_SHOW = 'RANDOM_SHOW';
exports.RANDOM_SHOW = RANDOM_SHOW;
var RANDOM_HIDE = 'RANDOM_HIDE';
exports.RANDOM_HIDE = RANDOM_HIDE;
var LIST_PHOTOS_START_JSON_LOAD = 'LIST_PHOTOS_START_JSON_LOAD';
exports.LIST_PHOTOS_START_JSON_LOAD = LIST_PHOTOS_START_JSON_LOAD;
var LIST_PHOTOS_SUCCESS_JSON_LOAD = 'LIST_PHOTOS_SUCCESS_JSON_LOAD';
exports.LIST_PHOTOS_SUCCESS_JSON_LOAD = LIST_PHOTOS_SUCCESS_JSON_LOAD;
var LIST_PHOTOS_ERROR_JSON_LOAD = 'LIST_PHOTOS_ERROR_JSON_LOAD';
exports.LIST_PHOTOS_ERROR_JSON_LOAD = LIST_PHOTOS_ERROR_JSON_LOAD;
var LIST_PHOTOS_SUCCESS_LIST_LOAD = 'LIST_PHOTOS_SUCCESS_LIST_LOAD';
exports.LIST_PHOTOS_SUCCESS_LIST_LOAD = LIST_PHOTOS_SUCCESS_LIST_LOAD;
var LIST_PHOTOS_ERROR_LIST_LOAD = 'LIST_PHOTOS_ERROR_LIST_LOAD';
exports.LIST_PHOTOS_ERROR_LIST_LOAD = LIST_PHOTOS_ERROR_LIST_LOAD;
var REST_PAGE_SCROLL = 300;
exports.REST_PAGE_SCROLL = REST_PAGE_SCROLL;
var LIST_PHOTOS_COUNT = 50;
exports.LIST_PHOTOS_COUNT = LIST_PHOTOS_COUNT;
var PHOTO_WIDTH = 300;
exports.PHOTO_WIDTH = PHOTO_WIDTH;