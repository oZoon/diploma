import Unsplash, { toJson } from "unsplash-js";
import {
    URL_SITE,
    ACCESS_KEY,
    SECRET,

    LIST_PHOTOS_START_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_JSON_LOAD,
    LIST_PHOTOS_ERROR_JSON_LOAD,
    LIST_PHOTOS_COUNT,
} from "lib/constants";
import { parseArrInThree } from 'lib/utils';

export const nextPageListPhotos = (user, photosListPhotos) => {
    return dispatch => {
        dispatch(listPhotosStartJsonLoad());
        const unsplash = new Unsplash({
            accessKey: ACCESS_KEY,
            secret: SECRET,
            callbackUrl: URL_SITE,
            bearerToken: user.code,
        });
        unsplash.auth.setBearerToken(user.jsonToken.access_token);
        const page = photosListPhotos.page + 1;
        unsplash.photos
            .listPhotos(page, LIST_PHOTOS_COUNT, "latest")
            .then(toJson)
            .then(json => {
                const [ids, sorted, heightMin] = parseArrInThree(photosListPhotos.ids, photosListPhotos.sorted, json);
                dispatch(listPhotosSuccessJsonLoad(ids, sorted, page, heightMin))
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
const listPhotosSuccessJsonLoad = (ids, sorted, page, heightMin) => {
    return {
        type: LIST_PHOTOS_SUCCESS_JSON_LOAD,
        ids,
        sorted,
        page,
        heightMin,
    }
}
const listPhotosErrorJsonLoad = (err) => {
    return {
        type: LIST_PHOTOS_ERROR_JSON_LOAD,
        err,
    }
}
