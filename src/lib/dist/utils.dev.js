"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserIndex = exports.getCountUserPhotos = exports.getHeightMin = exports.getProfilePhotos = exports.getProfileHeader = exports.checkUserCollection = exports.mergeCollection = exports.findUserCollection = exports.findArray = exports.checkTape = exports.checkUserProfile = exports.parseArrInThree = exports.parseSearchString = void 0;

var _constants = require("lib/constants");

// CMC_otherUser, AC_otherUser
var parseSearchString = function parseSearchString(searchString) {
  var result = false;
  var arr = searchString.split('');

  if (searchString.substr(0, 1) == '?' && arr.includes('=')) {
    result = searchString.split('=');
    result[0] = result[0].substr(1);
    return result;
  } else {
    return result;
  }
}; // AC_listPhotos, AC_otherUser


exports.parseSearchString = parseSearchString;

var parseArrInThree = function parseArrInThree(oldIds, oldSorted, arr) {
  var sorted = JSON.parse(JSON.stringify(oldSorted));
  var ids = JSON.parse(JSON.stringify(oldIds));
  var clearArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (!ids.includes(arr[i].id)) {
      clearArr.push(arr[i]);
    }
  }

  clearArr.forEach(function (item) {
    var height = _constants.PHOTO_WIDTH * item.height / item.width;
    var heightMin = Math.min(sorted[0].height, sorted[1].height, sorted[2].height);
    var index;

    for (var _i = 0; _i < sorted.length; _i++) {
      if (heightMin == sorted[_i].height) {
        index = _i;
        break;
      }
    }

    sorted[index].height = sorted[index].height + height;
    sorted[index].list.push(item);
    ids.push(item.id);
  });
  return [ids, sorted];
};

exports.parseArrInThree = parseArrInThree;

var checkUserProfile = function checkUserProfile(usersProfile, username) {
  return usersProfile.profile.map(function (item) {
    return item.username;
  }).includes(username);
};
/**
 *
 * @param {*} arr
 * @param {*} movedArea
 * @param {*} currentScroll
 * @param {*} username
 * return true when no any photos or scroll at the bottom screen, so it need to get photos
 */


exports.checkUserProfile = checkUserProfile;

var checkTape = function checkTape(arr, movedArea, currentScroll, username) {
  var userPhotos = extractOtherUserPhotos(arr, username);
  var sorted = 'sorted' in userPhotos ? JSON.parse(JSON.stringify(userPhotos.sorted)) : [];
  var heightMin = sorted.length > 0 ? Math.min(sorted[0].height, sorted[1].height, sorted[2].height) : 0;

  if (heightMin == 0 || heightMin != 0 && movedArea - currentScroll * 4 / 3 < 0) {
    return true;
  } else {
    return false;
  }
};

exports.checkTape = checkTape;

var extractOtherUserPhotos = function extractOtherUserPhotos(arr, username) {
  var result = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].username == username) {
      result = arr[i];
      break;
    }
  }

  return result;
}; // AC_otherUser


var findArray = function findArray(arr, username) {
  var item = {
    username: username,
    ids: [],
    page: 0,
    sorted: [{
      height: 0,
      list: []
    }, {
      height: 0,
      list: []
    }, {
      height: 0,
      list: []
    }]
  },
      page = 0,
      index = null;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].username == username) {
      item = arr[i];
      page = arr[i].page;
      index = i;
      break;
    }
  }

  return [item, page, index];
}; // AC_otherUser


exports.findArray = findArray;

var findUserCollection = function findUserCollection(arr, username) {
  var collection = {
    username: false,
    page: 0,
    ids: [],
    list: []
  },
      page = 0,
      index = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].username == username) {
      collection = arr[i];
      page = arr[i].page;
      index = i;
      break;
    }
  }

  return [collection, page, index];
}; // AC_otherUser


exports.findUserCollection = findUserCollection;

var mergeCollection = function mergeCollection(oldIds, oldList, arr) {
  var list = JSON.parse(JSON.stringify(oldList));
  var ids = JSON.parse(JSON.stringify(oldIds));
  var clearArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (!ids.includes(arr[i].id)) {
      clearArr.push(arr[i]);
    }
  }

  clearArr.forEach(function (item) {
    list.push(item);
    ids.push(item.id);
  });
  return [ids, list];
};

exports.mergeCollection = mergeCollection;

var checkUserCollection = function checkUserCollection(collections, username) {
  var result = false;

  for (var i = 0; i < collections.length; i++) {
    if (collections[i].username == username) {
      result = true;
      break;
    }
  }

  return result;
};

exports.checkUserCollection = checkUserCollection;

var getProfileHeader = function getProfileHeader(userList, username) {
  var result, profile;

  for (var i = 0; i < userList.length; i++) {
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
    result.interests = profile.tags.custom.map(function (item) {
      return item.title;
    });
    result.username = username;
  } else {
    result = false;
  }

  return result;
}; // CMC_userPhotos


exports.getProfileHeader = getProfileHeader;

var getProfilePhotos = function getProfilePhotos(userList, username) {
  var result, profile;

  for (var i = 0; i < userList.length; i++) {
    if (userList[i].username == username) {
      profile = userList[i];
      break;
    }
  }

  if (profile) {
    return profile.sorted;
  } else {
    return false;
  }
}; // CMC_otherUser


exports.getProfilePhotos = getProfilePhotos;

var getHeightMin = function getHeightMin(photosList, username) {
  var result = 0;

  for (var i = 0; i < photosList.length; i++) {
    if (photosList[i].username == username) {
      result = Math.min(photosList[i].sorted[0].height, photosList[i].sorted[1].height, photosList[i].sorted[2].height);
      break;
    }
  }

  return result;
};

exports.getHeightMin = getHeightMin;

var getCountUserPhotos = function getCountUserPhotos(usersProfile, username) {
  var photosCount = 0,
      photosShowed = 0;

  for (var i = 0; i < usersProfile.profiles.userList.length; i++) {
    if (usersProfile.profiles.userList[i].username == username) {
      photosCount = usersProfile.profiles.userList[i].total_photos;
      break;
    }
  }

  for (var _i2 = 0; _i2 < usersProfile.photos.length; _i2++) {
    if (usersProfile.photos[_i2].username == username) {
      photosShowed = usersProfile.photos[_i2].ids.length;
    }
  }

  return [photosCount, photosShowed];
};

exports.getCountUserPhotos = getCountUserPhotos;

var getUserIndex = function getUserIndex(usersProfile, username) {
  var index = null;

  for (var i = 0; i < usersProfile.profiles.userList.length; i++) {
    if (usersProfile.profiles.userList[i].username == username) {
      index = i;
      break;
    }
  }

  return index;
};

exports.getUserIndex = getUserIndex;