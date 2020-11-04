let url_site = 'http://localhost:8080';
const hostname = window && window.location && window.location.hostname;
if(hostname != 'localhost'){
    url_site = `http://${hostname}`;
}
export const URL_SITE = url_site;

export const VERSION = '4.0.8';
export const ACCESS_KEY = 'KVx67XvmzAv0NWFzGhl02RT3YJ0kXfNhhffCmc6V2Vk';
export const SECRET = 'NEbVoZN0xAL1MJkl9GCIfHmud75H71MjACB2fo0UdiU';

export const URL_HOME = '/';
export const URL_AUTHOR = '/author';
export const URL_DIPLOMA = '/diploma';

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
