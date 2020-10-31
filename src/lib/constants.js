export const URL_SITE = () => {
    const hostname = window && window.location && window.location.hostname;
    if(hostname == 'localhost'){
        return 'http://localhost:8080';
    }else{
        return `http://${hostname}`;
    }
}

export const VERSION = '4.0';
export const ACCESS_KEY = 'KVx67XvmzAv0NWFzGhl02RT3YJ0kXfNhhffCmc6V2Vk';
export const SECRET = 'NEbVoZN0xAL1MJkl9GCIfHmud75H71MjACB2fo0UdiU';

export const URL_HOME = '/';
export const URL_AUTHOR = '/author';
export const URL_DIPLOMA = '/diploma';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const AUTH_UPDATE = 'AUTH_UPDATE';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';

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
