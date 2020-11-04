import Unsplash, { toJson } from "unsplash-js";
import {
    URL_SITE,
    ACCESS_KEY,
    SECRET,
    RANDOM_START_JSON_LOAD,
    RANDOM_SUCCESS_JSON_LOAD,
    RANDOM_ERROR_JSON_LOAD,
    RANDOM_SUCCESS_PHOTO_LOAD,
    RANDOM_ERROR_PHOTO_LOAD,
    RANDOM_SHOW,
    RANDOM_HIDE,
} from "lib/constants";

export const getRandomPhoto = (user) => {
    return dispatch => {
        dispatch(randomStartJsonLoad());
        const unsplash = new Unsplash({
            accessKey: ACCESS_KEY,
            secret: SECRET,
            callbackUrl: URL_SITE,
            bearerToken: user.code,
        });
        unsplash.auth.setBearerToken(user.jsonToken.access_token);
        unsplash.photos
            .getRandomPhoto({ count: '1' })
            .then(toJson)
            .then(json => {
                dispatch(randomSuccessJsonLoad(json));
                const img = new Image();
                img.src = json[0].urls.raw;
                img.onload = () => dispatch(randomSuccessPhotoLoad());
                img.onerror = (err) => dispatch(randomErrorPhotoLoad(err));
            })
            .catch(err => {
                dispatch(randomErrorJsonLoad(err))
            })
    }
}
const randomStartJsonLoad = () => {
    return {
        type: RANDOM_START_JSON_LOAD,
    }
}
const randomSuccessJsonLoad = (json) => {
    return {
        type: RANDOM_SUCCESS_JSON_LOAD,
        json,
    }
}
const randomErrorJsonLoad = (err) => {
    return {
        type: RANDOM_ERROR_JSON_LOAD,
        err,
    }
}
const randomSuccessPhotoLoad = () => {
    return {
        type: RANDOM_SUCCESS_PHOTO_LOAD,
    }
}
const randomErrorPhotoLoad = (err) => {
    return {
        type: RANDOM_ERROR_PHOTO_LOAD,
        err,
    }
}
export const randomMouseOver = () => {
    return {
        type: RANDOM_SHOW,
    }
}
export const randomMouseOut = () => {
    return {
        type: RANDOM_HIDE,
    }
}
