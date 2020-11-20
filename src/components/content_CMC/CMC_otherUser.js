import React, { useEffect, useState } from "react";
import UserHeader from 'content/CMC_userHeader';
import UserPhotos from 'content/CMC_userPhotos';
import UserLikes from 'content/CMC_userLikes';
import {
    parseSearchString,
    getHeightMin,
    getCountImages,
} from "lib/utils";

function OtherUser(props) {
    const {
        user,
        getUserData,
        history,
        usersProfile,
        broken,
    } = props;

    const [request, username] = parseSearchString(history.location.search);
    const [currentScroll, setCurrentScroll] = useState(0);
    const [whellDelta, setWhellDelta] = useState(0);

    // if (usersProfile.state) {
    //     broken();
    // }

    // profile
    useEffect(() => {
        if (
            request == 'profile' &&
            user.isLoggedIn &&
            !usersProfile.state &&
            !usersProfile.profiles.usernames.includes(username)
        ) getUserData(history, user, usersProfile);
    });

    // photos
    const [heightMinPhotosFeed, setHeightMinPhotosFeed] = useState(Math.max.apply(null, [500, getHeightMin(usersProfile.photos, username)]));
    const [photosCount, photosShowed] = getCountImages(usersProfile, username, 'photos');

    // likes
    const [heightMinLikesFeed, setHeightMinLikesFeed] = useState(Math.max.apply(null, [500, getHeightMin(usersProfile.likes, username)]));
    const [likesCount, likesShowed] = getCountImages(usersProfile, username, 'likes');

    useEffect(() => {
        window.onscroll = () => setCurrentScroll(window.pageYOffset);
        window.onwheel = ({ deltaY }) => setWhellDelta(Math.abs(deltaY));
        setHeightMinPhotosFeed(Math.max.apply(null, [500, getHeightMin(usersProfile.photos, username)]));
        setHeightMinLikesFeed(Math.max.apply(null, [500, getHeightMin(usersProfile.likes, username)]));
        // photos
        if (
            request == 'photos' &&
            user.isLoggedIn &&
            !usersProfile.state &&
            photosShowed < photosCount &&
            (
                (heightMinPhotosFeed == 500 && currentScroll == 0 && whellDelta == 0) ||
                (heightMinPhotosFeed != 0 && heightMinPhotosFeed - (currentScroll + whellDelta * 2) < 0)
            )
        ) {
            setHeightMinPhotosFeed(heightMinPhotosFeed + whellDelta * 20);
            getUserData(history, user, usersProfile);
        }
        // likes
        if (
            request == 'likes' &&
            user.isLoggedIn &&
            !usersProfile.state &&
            likesShowed < likesCount &&
            (
                (heightMinLikesFeed == 500 && currentScroll == 0 && whellDelta == 0) ||
                (heightMinLikesFeed != 0 && heightMinLikesFeed - (currentScroll + whellDelta * 2) < 0)
            )
        ) {
            console.log('liked trigger');
            setHeightMinLikesFeed(heightMinLikesFeed + whellDelta * 20);
            getUserData(history, user, usersProfile);
        }
    }, [currentScroll, request]);

    let result = null;
    if (user.isLoggedIn) {
        const propsUserHeader = {
            username,
            userList: usersProfile.profiles.userList,
        }
        result = <UserHeader {...propsUserHeader} />

        if (request == 'photos' || request == 'profile') {
            const propsUserPhotos = {
                username,
                imageList: usersProfile.photos,
            }
            result = (
                <>
                    {result}
                    <UserPhotos {...propsUserPhotos} />
                </>
            )
        }
        if (request == 'likes') {
            const propsUserLikes = {
                username,
                imageList: usersProfile.likes,
            }
            result = (
                <>
                    {result}
                    <UserLikes {...propsUserLikes} />
                </>
            )
        }
    }
    return result;
}

export default OtherUser;
