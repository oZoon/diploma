import Unsplash, { toJson } from "unsplash-js";
import {
    LOG_IN_START,
    LOG_IN_SUCCESS_CODE,
    LOG_IN_SUCCESS_JSON_TOKEN_LOAD,
    LOG_IN_SUCCESS_JSON_PROFILE_LOAD,
    LOG_IN_ERROR,
    LOG_OUT,

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

    LIST_PHOTOS_START_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_JSON_LOAD,
    LIST_PHOTOS_ERROR_JSON_LOAD,
    LIST_PHOTOS_SUCCESS_LIST_LOAD,
    LIST_PHOTOS_ERROR_LIST_LOAD,

} from "lib/constants";

export const logIn = () => {
    return (dispatch) => {
        dispatch(logInStart());
        const unsplash = new Unsplash({
            accessKey: ACCESS_KEY,
            secret: SECRET,
            callbackUrl: URL_SITE,
        });
        const authenticationUrl = unsplash.auth.getAuthenticationUrl([
            "public",
            "write_likes",
        ]);
        location.assign(authenticationUrl);
    }
}
const logInStart = () => {
    return {
        type: LOG_IN_START,
    }
}
export const continueLogIn = (code, history) => {
    return (dispatch) => {
        dispatch(logInSuccessCode(code));
        const unsplash = new Unsplash({
            accessKey: ACCESS_KEY,
            secret: SECRET,
            callbackUrl: URL_SITE,
            bearerToken: code,
        });
        unsplash.auth
            .userAuthentication(code)
            .then(toJson)
            .then((json) => {
                if (json.access_token) {
                    dispatch(logInSuccesToken(json));
                    unsplash.auth.setBearerToken(json.access_token);
                    unsplash.currentUser
                        .profile()
                        .then(toJson)
                        .then((json) => {
                            dispatch(logInSuccessProfile(json));
                            history.push('/', 'loggedIn');
                        })
                        .catch((err) => {
                            dispatch(logInError(err));
                        })
                } else {
                    dispatch(logInError(err));
                }
            })
            .catch((err) => {
                dispatch(logInError(err));
            })

    }
}
const logInSuccessCode = (code) => {
    return {
        type: LOG_IN_SUCCESS_CODE,
        code,
    }
}
const logInSuccesToken = (json) => {
    return {
        type: LOG_IN_SUCCESS_JSON_TOKEN_LOAD,
        json,
    }
}
const logInSuccessProfile = (json) => {
    return {
        type: LOG_IN_SUCCESS_JSON_PROFILE_LOAD,
        json,
    }
}
const logInError = (err) => {
    return {
        type: LOG_IN_ERROR,
        err,
    }
}
export const logOut = (history) => {
    history.push('/', 'logOut');
    return {
        type: LOG_OUT,
    };

};

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
