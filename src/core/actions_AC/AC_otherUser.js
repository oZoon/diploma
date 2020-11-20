import Unsplash, { toJson } from "unsplash-js";
import {
    URL_SITE,
    ACCESS_KEY,
    SECRET,
    LIST_PHOTOS_COUNT,
    LIST_COLLECTIONS_COUNT,
    USER_START_JSON_LOAD,
    USER_SUCCESS_JSON_LOAD_PROFILE,
    USER_SUCCESS_JSON_LOAD_IMAGES,
    USER_SUCCESS_JSON_LOAD_COLLECTIONS,
    USER_ERROR_JSON_LOAD,
    CORRECT_USER_IMAGES_COUNT,
} from "lib/constants";
import { parseSearchString, findArray, parseArrInThree, findUserCollection, mergeCollection, getCountUserPhotos, getUserIndex } from 'lib/utils';

export const getUserData = (history, user, usersProfile) => {
    // console.log('getUserData');
    const [request, username] = parseSearchString(history.location.search);
    // console.log([request, username]);
    return dispatch => {
        if (request && username) {
            const unsplash = new Unsplash({
                accessKey: ACCESS_KEY,
                secret: SECRET,
                callbackUrl: URL_SITE,
                bearerToken: user.code,
            });
            unsplash.auth.setBearerToken(user.jsonToken.access_token);
            switch (request) {
                case 'profile':
                    dispatch(getUserDataJsonLoad());
                    unsplash.users.profile(username)
                        .then(toJson)
                        .then(json => {
                            if (!usersProfile.profiles.usernames.includes(json.username)) {
                                dispatch(getUserDataSuccessJsonLoadProfile(json))
                            }
                        })
                        .catch(err => {
                            dispatch(getUserDataError(err))
                        })
                    getUserImages(dispatch, usersProfile, username, unsplash, 'photos');
                    break;

                case 'photos':
                    // console.log('photos');
                    getUserImages(dispatch, usersProfile, username, unsplash, 'photos');
                    break;

                case 'likes':
                    // console.log('photos');
                    getUserImages(dispatch, usersProfile, username, unsplash, 'likes');
                    break;


                // case 'collections':
                //     dispatch(getUserDataJsonLoad());
                //     [collection, page, index] = findUserCollection(usersProfile.collections, username);
                //     console.log([collection, page, index]);
                //     page = page + 1;
                //     unsplash.users.collections(username, 1, LIST_COLLECTIONS_COUNT, 'updated')
                //         .then(toJson)
                //         .then(json => {
                //             console.log('collections: ', json);
                //             const [ids, list] = mergeCollection(collection.ids, collection.list, json);
                //             const result = {
                //                 username: username,
                //                 page: page,
                //                 ids: ids,
                //                 list: list,
                //             }
                //             console.log(result);
                //             dispatch(getUserDataSuccessJsonLoadCollections(result, index))
                //         })
                //         .catch(err => {
                //             dispatch(getUserDataError(err))
                //         })
                //     break;
            }
        } else {
            dispatch(getUserDataError('errorSearchString'))
            history.push('/', 'errorSearchString');
        }
    }
}

const getUserImages = (dispatch, usersProfile, username, unsplash, imageType) => {
    let item, page, index;
    dispatch(getUserDataJsonLoad());
    [item, page, index] = findArray(usersProfile[imageType], username);
    page = page + 1;
    unsplashData(unsplash, username, page, imageType)
        // unsplash.users.photos(username, page, LIST_PHOTOS_COUNT, 'latest')
        .then(toJson)
        .then(json => {
            const jsonNew = JSON.parse(JSON.stringify(json));
            if (Object.keys(jsonNew).length == 0) {
                const [imageCount, imageShowed] = getCountImages(usersProfile, username, imageType);
                const index = getUserIndex(usersProfile, username);
                dispatch(correctUserImageCount(imageShowed, index, imageType));
            } else {
                const [ids, sorted, heightMin] = parseArrInThree(item.ids, item.sorted, json);
                const result = {
                    username: username,
                    page: page,
                    ids: ids,
                    sorted: sorted,
                    heightMin,
                };
                dispatch(getUserDataSuccessJsonLoadImages(result, index, imageType));
            }
        })
        .catch(err => {
            dispatch(getUserDataError(err))
        })
}

const unsplashData = (unsplash, username, page, type) => {
    switch (type) {
        case 'photos':
            return unsplash.users.photos(username, page, LIST_PHOTOS_COUNT, 'latest')
        case 'likes':
            return unsplash.users.likes(username, page, LIST_PHOTOS_COUNT, 'latest')
    }
}

const getUserDataJsonLoad = () => {
    return {
        type: USER_START_JSON_LOAD,
    }
}
const getUserDataSuccessJsonLoadProfile = (json) => {
    return {
        type: USER_SUCCESS_JSON_LOAD_PROFILE,
        json,
    }
}
const getUserDataSuccessJsonLoadImages = (result, index, imageType) => {
    return {
        type: USER_SUCCESS_JSON_LOAD_IMAGES,
        result,
        index,
        imageType,
    }
}
const getUserDataSuccessJsonLoadCollections = (result, index) => {
    return {
        type: USER_SUCCESS_JSON_LOAD_COLLECTIONS,
        result,
        index,
    }
}
const getUserDataError = (err) => {
    return {
        type: USER_ERROR_JSON_LOAD,
        err,
    }
}
const correctUserImageCount = (photosShowed, index, imageType) => {
    return {
        type: CORRECT_USER_IMAGES_COUNT,
        photosShowed,
        index,
        imageType,
    }
}
