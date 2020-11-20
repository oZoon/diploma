import React, { useEffect, useState } from "react";
import UserHeader from 'content/CMC_userHeader';
import UserPhotos from 'content/CMC_userPhotos';
import {
    parseSearchString,
    checkTape,
    checkUserCollection,
    getHeightMin,
    getProfilePhotos,
    getCountUserPhotos,
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

    // profile
    useEffect(() => {
        if (
            request == 'profile' &&
            user.isLoggedIn &&
            !usersProfile.state &&
            !usersProfile.profiles.usernames.includes(username)
        ) getUserData(history, user, usersProfile);
    });

    const [currentScroll, setCurrentScroll] = useState(0);
    const [heightMin, setHeightMin] = useState(Math.max.apply(null, [500, getHeightMin(usersProfile.photos, username)]));
    const [whellDelta, setWhellDelta] = useState(0);
    const [photosCount, photosShowed] = getCountUserPhotos(usersProfile, username);
    useEffect(() => {
        window.onscroll = () => setCurrentScroll(window.pageYOffset);
        window.onwheel = ({ deltaY }) => setWhellDelta(Math.abs(deltaY));
        setHeightMin(Math.max.apply(null, [500, getHeightMin(usersProfile.photos, username)]));
        if (
            request == 'photos' &&
            user.isLoggedIn &&
            !usersProfile.state &&
            photosShowed < photosCount &&
            (
                (heightMin == 500 && currentScroll == 0 && whellDelta == 0) ||
                (heightMin != 0 && heightMin - (currentScroll + whellDelta * 2) < 0)
            )
        ) {
            setHeightMin(heightMin + whellDelta * 8);
            getUserData(history, user, usersProfile);
        }
    }, [currentScroll]);

    // likes
    if (request == 'likes') {
        // const [currentScroll, setCurrentScroll] = useState(0);
        // const movedArea = document.body.scrollHeight - document.body.clientHeight;
        // useEffect(() => {
        //     window.onscroll = () => {
        //         setCurrentScroll(window.pageYOffset)
        //     }
        // }, [window.pageYOffset]);
        // useEffect(() => {
        //     if (
        //         user.isLoggedIn &&
        //         !usersProfile.state &&
        //         checkTape(usersProfile.likes, movedArea, currentScroll, username)
        //     ) getUserData(history, user, usersProfile);
        // });
    }

    // collection
    if (request == 'collections') {
        // if (usersProfile.state) {
        //     broken();
        // }

        // useEffect(() => {
        //     if (
        //         user.isLoggedIn &&
        //         !usersProfile.state &&
        //         !checkUserCollection(usersProfile.collections, username)
        //     ) {
        //         console.log('collections triggered');
        //         getUserData(history, user, usersProfile);
        //     }
        // });
    }

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
                photosList: usersProfile.photos,
            }
            result = (
                <>
                    {result}
                    <UserPhotos {...propsUserPhotos} />
                </>
            )
        }

    }

    return result;





    // const propsHeader = getProfileHeader(usersProfile, username);
    // return (
    //     <UserHeader {...propsHeader} />
    // )

    // return null;

}

export default OtherUser;
