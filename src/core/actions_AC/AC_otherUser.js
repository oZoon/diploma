import Unsplash, { toJson } from "unsplash-js";
import {
    URL_SITE,
    ACCESS_KEY,
    SECRET,
    LIST_PHOTOS_COUNT,
    LIST_COLLECTIONS_COUNT,
    USER_START_JSON_LOAD,
    USER_SUCCESS_JSON_LOAD_PROFILE,
    USER_SUCCESS_JSON_LOAD_PHOTOS,
    USER_SUCCESS_JSON_LOAD_LIKES,
    USER_SUCCESS_JSON_LOAD_COLLECTIONS,
    USER_ERROR_JSON_LOAD,
    CORRECT_USER_PHOTOS_COUNT,
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
                    getUserDataPhotos(dispatch, usersProfile, username, unsplash);
                    break;

                case 'photos':
                    // console.log('photos');
                    getUserDataPhotos(dispatch, usersProfile, username, unsplash);
                    break;

                // case 'likes':
                //     dispatch(getUserDataJsonLoad());
                //     [item, page, index] = findArray(usersProfile.likes, username);
                //     page = page + 1;
                //     unsplash.users.likes(username, page, LIST_PHOTOS_COUNT, 'latest')
                //         .then(toJson)
                //         .then(json => {
                //             const [ids, sorted] = parseArrInThree(item.ids, item.sorted, json);
                //             const result = {
                //                 username: username,
                //                 page: page,
                //                 ids: ids,
                //                 sorted: sorted,
                //             };
                //             dispatch(getUserDataSuccessJsonLoadLikes(result, index))
                //         })
                //         .catch(err => {
                //             dispatch(getUserDataError(err))
                //         })
                //     break;
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

const getUserDataPhotos = (dispatch, usersProfile, username, unsplash) => {
    let item, page, index;
    dispatch(getUserDataJsonLoad());
    // console.log(usersProfile);
    [item, page, index] = findArray(usersProfile.photos, username);
    page = page + 1;
    // console.log([item, page, index]);
    unsplash.users.photos(username, page, LIST_PHOTOS_COUNT, 'latest')
        .then(toJson)
        .then(json => {
            const jsonNew = JSON.parse(JSON.stringify(json));
            // console.log(jsonNew);
            // console.log(Object.keys(jsonNew).length);
            // Object.keys(jsonNew).length ? console.log('true') : console.log('false');
            if (Object.keys(jsonNew).length == 0) {
                // console.log('Object.keys(jsonNew).length = 0');
                const [photosCount, photosShowed] = getCountUserPhotos(usersProfile, username);
                // console.log([photosCount, photosShowed]);
                const index = getUserIndex(usersProfile, username);
                // console.log(index);
                dispatch(correctUserPhotosCount(photosShowed, index));
            } else {
                const [ids, sorted, heightMin] = parseArrInThree(item.ids, item.sorted, json);
                // console.log([ids, sorted]);
                const result = {
                    username: username,
                    page: page,
                    ids: ids,
                    sorted: sorted,
                    heightMin,
                };
                // console.log(result);
                dispatch(getUserDataSuccessJsonLoadPhotos(result, index));
            }
        })
        .catch(err => {
            dispatch(getUserDataError(err))
        })
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
const getUserDataSuccessJsonLoadPhotos = (result, index) => {
    return {
        type: USER_SUCCESS_JSON_LOAD_PHOTOS,
        result,
        index,
    }
}
const getUserDataSuccessJsonLoadLikes = (result, index) => {
    return {
        type: USER_SUCCESS_JSON_LOAD_LIKES,
        result,
        index,
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
const correctUserPhotosCount = (photosShowed, index) => {
    return {
        type: CORRECT_USER_PHOTOS_COUNT,
        photosShowed,
        index,
    }
}
