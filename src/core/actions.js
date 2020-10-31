import { toJson } from "unsplash-js";
import {
    LOG_IN,
    LOG_OUT,
    AUTH_UPDATE,
    REQUEST_SEARCH,

    RANDOM_START_JSON_LOAD,
    RANDOM_SUCCESS_JSON_LOAD,
    RANDOM_ERROR_JSON_LOAD,
    RANDOM_SUCCESS_PHOTO_LOAD,
    RANDOM_ERROR_PHOTO_LOAD,
    RANDOM_SHOW,
    RANDOM_HIDE,

    LIST_PHOTOS_START_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_JSON_LOAD,
    LIST_PHOTOS_ERROR_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_LIST_LOAD,
    LIST_PHOTOS_ERROR_LIST_LOAD,

} from "lib/constants";

export const logIn = (unsplash) => {
    return {
        type: LOG_IN,
        unsplash,
    };
};

export const logOut = (unsplash) => {
    return {
        type: LOG_OUT,
        unsplash,
    };
};

export const authUpdate = (userData) => {
    return {
        type: AUTH_UPDATE,
        userData,
    };
};

export const requestSearch = (text, unsplash) => {
    return {
        type: REQUEST_SEARCH,
        text,
        unsplash,
    }
}

export const getRandomPhoto = (unsplash) => {
    return dispatch => {
        dispatch(randomStartJsonLoad());
        unsplash
            .getRandomPhoto()
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

export const listPhotos = (unsplash) => {
    return dispatch => {
        dispatch(listPhotosStartJsonLoad());
        unsplash
            .getListPhotos(1)
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
