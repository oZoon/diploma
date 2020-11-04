import Unsplash, { toJson } from "unsplash-js";
import {
    URL_SITE,
    ACCESS_KEY,
    SECRET,

    LIST_PHOTOS_START_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_JSON_LOAD,
    LIST_PHOTOS_ERROR_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_LIST_LOAD,
    LIST_PHOTOS_ERROR_LIST_LOAD,

} from "lib/constants";

export const listPhotos = (user) => {
    console.log(user);
    return dispatch => {
        dispatch(listPhotosStartJsonLoad());
        const unsplash = new Unsplash({
            accessKey: ACCESS_KEY,
            secret: SECRET,
            callbackUrl: URL_SITE,
            bearerToken: user.code,
        });
        unsplash.auth.setBearerToken(user.jsonToken.access_token);
        unsplash.photos
            // .listPhotos(1, 30, "latest")
            .getRandomPhoto({ count: '20' })
            .then(toJson)
            .then(json => {
                console.log(json);
                dispatch(listPhotosSuccessJsonLoad(json))
            })
            .catch(err => {
                dispatch(listPhotosErrorJsonLoad(err))
            })
    }
}
const listPhotosStartJsonLoad = () => {
    return {
        type: LIST_PHOTOS_START_JSON_LOAD,
    }
}
const listPhotosSuccessJsonLoad = (json) => {
    return {
        type: LIST_PHOTOS_SUCCESS_JSON_LOAD,
        json,
    }
}
const listPhotosErrorJsonLoad = (err) => {
    return {
        type: LIST_PHOTOS_ERROR_JSON_LOAD,
        err,
    }
}
