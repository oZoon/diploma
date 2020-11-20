import { PHOTO_WIDTH } from 'lib/constants';

// CMC_otherUser, AC_otherUser
export const parseSearchString = (searchString) => {
    let result = false;
    const arr = searchString.split('');
    if (searchString.substr(0, 1) == '?' && arr.includes('=')) {
        result = searchString.split('=');
        result[0] = result[0].substr(1);
        return result;
    } else {
        return result;
    }
}


// AC_listPhotos, AC_otherUser
export const parseArrInThree = (oldIds, oldSorted, arr) => {
    const sorted = JSON.parse(JSON.stringify(oldSorted));
    const ids = JSON.parse(JSON.stringify(oldIds));
    let clearArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!ids.includes(arr[i].id)) {
            clearArr.push(arr[i]);
        }
    }
    clearArr.forEach(item => {
        const height = PHOTO_WIDTH * item.height / item.width;
        const heightMin = Math.min(sorted[0].height, sorted[1].height, sorted[2].height);
        let index;
        for (let i = 0; i < sorted.length; i++) {
            if (heightMin == sorted[i].height) {
                index = i;
                break;
            }
        }
        sorted[index].height = sorted[index].height + height;
        sorted[index].list.push(item);
        ids.push(item.id);
    });
    const heightMin = Math.min(sorted[0].height, sorted[1].height, sorted[2].height);
    return [ids, sorted, heightMin];
}

export const checkUserProfile = (usersProfile, username) => {
    return usersProfile.profile.map(item => { return item.username }).includes(username);
}

/**
 *
 * @param {*} arr
 * @param {*} movedArea
 * @param {*} currentScroll
 * @param {*} username
 * return true when no any photos or scroll at the bottom screen, so it need to get photos
 */
export const checkTape = (arr, movedArea, currentScroll, username) => {
    const userPhotos = extractOtherUserPhotos(arr, username);
    const sorted = ('sorted' in userPhotos) ? JSON.parse(JSON.stringify(userPhotos.sorted)) : [];
    const heightMin = sorted.length > 0 ? Math.min(sorted[0].height, sorted[1].height, sorted[2].height) : 0;
    if (heightMin == 0 || (heightMin != 0 && movedArea - currentScroll * 4 / 3 < 0)) {
        return true;
    } else {
        return false;
    }
}
const extractOtherUserPhotos = (arr, username) => {
    let result = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].username == username) {
            result = arr[i];
            break;
        }
    }
    return result;
}

// AC_otherUser
export const findArray = (arr, username) => {
    let item = {
        username: username,
        ids: [],
        page: 0,
        sorted: [
            {
                height: 0,
                list: [],
            },
            {
                height: 0,
                list: [],
            },
            {
                height: 0,
                list: [],
            },
        ]
    },
        page = 0,
        index = null;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].username == username) {
            item = arr[i];
            page = arr[i].page;
            index = i;
            break;
        }
    }
    return [item, page, index];
}

// AC_otherUser
export const findUserCollection = (arr, username) => {
    let collection = {
        username: false,
        page: 0,
        ids: [],
        list: []
    },
        page = 0,
        index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].username == username) {
            collection = arr[i];
            page = arr[i].page;
            index = i;
            break;
        }
    }
    return [collection, page, index];
}

// AC_otherUser
export const mergeCollection = (oldIds, oldList, arr) => {
    const list = JSON.parse(JSON.stringify(oldList));
    const ids = JSON.parse(JSON.stringify(oldIds));
    let clearArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!ids.includes(arr[i].id)) {
            clearArr.push(arr[i]);
        }
    }
    clearArr.forEach(item => {
        list.push(item);
        ids.push(item.id);
    });
    return [ids, list];

}

export const checkUserCollection = (collections, username) => {
    let result = false;
    for (let i = 0; i < collections.length; i++) {
        if (collections[i].username == username) {
            result = true;
            break;
        }
    }
    return result;
}

export const getProfileHeader = (userList, username) => {
    let result, profile;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].username == username) {
            profile = userList[i];
            break;
        }
    }
    if (profile) {
        result = {};
        result.avatar = profile.profile_image.large;
        result.followers = profile.followers_count;
        result.following = profile.following_count;
        result.photos = profile.total_photos;
        result.collections = profile.total_collections;
        result.liked = profile.total_likes;
        result.location = profile.location;
        result.fullName = profile.name;
        result.bio = profile.bio;
        result.interests = profile.tags.custom.map(item => { return item.title });
        result.username = username;
    } else {
        result = false;
    }
    return result;
}

// CMC_userPhotos
export const getImageList = (imageList, username) => {
    let result, profile;
    for (let i = 0; i < imageList.length; i++) {
        if (imageList[i].username == username) {
            profile = imageList[i];
            break;
        }
    }
    if (profile) {
        return profile.sorted;
    } else {
        return false;
    }
}

// CMC_otherUser
export const getHeightMin = (photosList, username) => {
    let result = 0;
    for (let i = 0; i < photosList.length; i++) {
        if (photosList[i].username == username) {
            result = photosList[i].heightMin;
            break;
        }
    }
    return result;
}

// CMC_otherUser, AC_otherUser
export const getCountImages = (usersProfile, username, type) => {
    let imageCount = 0,
        imageShowed = 0;
    for (let i = 0; i < usersProfile.profiles.userList.length; i++) {
        if (usersProfile.profiles.userList[i].username == username) {
            imageCount = usersProfile.profiles.userList[i][`total_${type}`];
            break;
        }
    }
    const feed = usersProfile[type];
    for (let i = 0; i < feed.length; i++) {
        if (feed[i].username == username) {
            imageShowed = feed[i].ids.length;
        }
    }
    return [imageCount, imageShowed];
}

export const getUserIndex = (usersProfile, username) => {
    let index = null;
    for (let i = 0; i < usersProfile.profiles.userList.length; i++) {
        if (usersProfile.profiles.userList[i].username == username) {
            index = i;
            break;
        }
    }
    return index;
}
