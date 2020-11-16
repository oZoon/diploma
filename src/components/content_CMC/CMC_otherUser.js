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

    const [currentScroll, setCurrentScroll] = useState(0);
    const [request, username] = parseSearchString(history.location.search);
    const [photosCount, photosShowed] = getCountUserPhotos(usersProfile, username);
    const heightMin = getHeightMin(usersProfile.photos, username);
    const movedArea = document.body.scrollHeight - document.body.clientHeight;

    // if(usersProfile.state){
    //     broken();
    // }

    useEffect(() => {
        let state = true;
        if (
            state &&
            request == 'profile' &&
            user.isLoggedIn &&
            !usersProfile.state &&
            !usersProfile.profiles.usernames.includes(username)
        ) getUserData(history, user);
        return () => { state = false; }
    });
    useEffect(() => {
        let state = true;
        window.onscroll = () => {
            setCurrentScroll(window.pageYOffset)
        }
        if (
            state &&
            request == 'photos' &&
            user.isLoggedIn &&
            !usersProfile.state &&
            photosShowed < photosCount &&
            (
                heightMin == 0 ||
                heightMin != 0 && movedArea - currentScroll * 4 / 3 < 0
            )
        ) {
            console.log(currentScroll);
            getUserData(history, user, usersProfile);
            setCurrentScroll(window.pageYOffset);
        }
        return () => {
            state = false;
            setCurrentScroll(window.pageYOffset);
        }
    });


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

        if (request == 'photos') {
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
