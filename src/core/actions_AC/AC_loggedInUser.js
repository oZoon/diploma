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

export const continueLogIn = (history) => {
    const code = history.location.search.substr(6);
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

export const logOut = (history) => {
    history.push('/', 'logOut');
    return {
        type: LOG_OUT,
    };

};

const logInStart = () => {
    return {
        type: LOG_IN_START,
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
