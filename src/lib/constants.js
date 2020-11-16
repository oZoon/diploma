let url_site = 'http://localhost:8080';
const hostname = window && window.location && window.location.hostname;
if(hostname != 'localhost'){
    url_site = `http://${hostname}`;
}
export const URL_SITE = url_site;

import packageJson from '../../package.json';
export const VERSION = packageJson.version;

export const ACCESS_KEY = 'KVx67XvmzAv0NWFzGhl02RT3YJ0kXfNhhffCmc6V2Vk';
export const SECRET = 'NEbVoZN0xAL1MJkl9GCIfHmud75H71MjACB2fo0UdiU';

export const URL_HOME = '/';
export const URL_AUTHOR = '/author';
export const URL_DIPLOMA = '/diploma';
export const URL_SEARCH = '/search?text';

export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN_SUCCESS_CODE = 'LOG_IN_SUCCESS_CODE';
export const LOG_IN_SUCCESS_JSON_TOKEN_LOAD = 'LOG_IN_SUCCESS_JSON_TOKEN_LOAD';
export const LOG_IN_SUCCESS_JSON_PROFILE_LOAD = 'LOG_IN_SUCCESS_JSON_PROFILE_LOAD';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';

export const RANDOM_START_JSON_LOAD = 'RANDOM_START_JSON_LOAD';
export const RANDOM_SUCCESS_JSON_LOAD = 'RANDOM_SUCCESS_JSON_LOAD';
export const RANDOM_ERROR_JSON_LOAD = 'RANDOM_ERROR_JSON_LOAD';
export const RANDOM_SUCCESS_PHOTO_LOAD = 'RANDOM_SUCCESS_PHOTO_LOAD';
export const RANDOM_ERROR_PHOTO_LOAD = 'RANDOM_ERROR_PHOTO_LOAD';
export const RANDOM_SHOW = 'RANDOM_SHOW';
export const RANDOM_HIDE = 'RANDOM_HIDE';

export const LIST_PHOTOS_START_JSON_LOAD = 'LIST_PHOTOS_START_JSON_LOAD';
export const LIST_PHOTOS_SUCCESS_JSON_LOAD = 'LIST_PHOTOS_SUCCESS_JSON_LOAD';
export const LIST_PHOTOS_ERROR_JSON_LOAD = 'LIST_PHOTOS_ERROR_JSON_LOAD';
export const LIST_PHOTOS_SUCCESS_LIST_LOAD = 'LIST_PHOTOS_SUCCESS_LIST_LOAD';
export const LIST_PHOTOS_ERROR_LIST_LOAD = 'LIST_PHOTOS_ERROR_LIST_LOAD';

// export const REST_PAGE_SCROLL = 300;
export const LIST_PHOTOS_COUNT = 20;
export const LIST_COLLECTIONS_COUNT = 10;
export const PHOTO_WIDTH = 300;

export const URL_USER_PROFILE = '/user?profile';
export const URL_USER_PHOTOS = '/user?photos';
export const URL_USER_LIKES = '/user?likes';
export const URL_USER_COLLECTIONS = '/user?collections';
export const URL_USER_FOLLOW = '/owner?follow';

export const USER_START_JSON_LOAD = 'USER_START_JSON_LOAD';
export const USER_SUCCESS_JSON_LOAD_PROFILE = 'USER_SUCCESS_JSON_LOAD_PROFILE';
export const USER_SUCCESS_JSON_LOAD_PHOTOS = 'USER_SUCCESS_JSON_LOAD_PHOTOS';
export const USER_SUCCESS_JSON_LOAD_LIKES = 'USER_SUCCESS_JSON_LOAD_LIKES';
export const USER_SUCCESS_JSON_LOAD_COLLECTIONS = 'USER_SUCCESS_JSON_LOAD_COLLECTIONS';
export const USER_ERROR_JSON_LOAD = 'USER_ERROR_JSON_LOAD';
export const CORRECT_USER_PHOTOS_COUNT = 'CORRECT_USER_PHOTOS_COUNT';
