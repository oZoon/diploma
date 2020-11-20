import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "containers/CNT_header";
import Content from "containers/CNT_content";
import Background from 'content/CMC_background';
import LoaderAnimation from 'content/CMC_loaderGif';

import { getRandomPhoto, randomMouseOver, randomMouseOut } from "actions/AC_randomPhoto";
import { logIn, continueLogIn, logOut } from 'actions/AC_loggedInUser';
import { nextPageListPhotos } from 'actions/AC_listPhotos';
import { getUserData } from 'actions/AC_otherUser';
import { broken } from 'actions/AC_broken';

// /!q@q$q&q*q(q)q-q=q:q

let App = (props) => {
    console.log(props);
    const {
        onLogIn,
        onLogOut,
        user,
        history,
        onGetRandomPhoto,
        photosGetRandomPhoto,
        photosListPhotos,
        onRandomMouseOver,
        onRandomMouseOut,
        continueLogIn,
        getNextPageListPhotos,
        getUserData,
        usersProfile,
        broken,
    } = props;

    if (!user.isLoggedIn) {
        useEffect(() => {
            if (history.location.search.substr(0, 6) == '?code=') continueLogIn(history);
        }, [history.location.search]);
    }


    // const [busy, setBusy] = useState(false);
    // const [code, setCode] = useState(false);

    // if (!user.isLoggedIn) {
    //     useEffect(() => {
    //         if (history.location.search.substr(0, 6) == '?code=') setCode(true);
    //         if (code) continueLogIn(history);
    //         // if (history.location.search.substr(0, 6) == '?code=') continueLogIn(history);
    //     }, [code]);
    // }


    const propsHeader = {
        onLogIn,
        onLogOut,
        user,
        onGetRandomPhoto,
        onRandomMouseOver,
        onRandomMouseOut,
        history,
    };
    const propsContent = {
        photosGetRandomPhoto,
        photosListPhotos,
        user,
        getNextPageListPhotos,
        getUserData,
        history,
        usersProfile,
        broken,
    }
    const propsBackground = {
        imgUrl: photosGetRandomPhoto.imgUrl,
        show: photosGetRandomPhoto.show,
    }
    const propsLoaderAnimation = {
        state:
            [
                user.state,
                photosGetRandomPhoto.state,
                photosListPhotos.state,
                usersProfile.state,
            ]
    }
    return (
        <>
            <LoaderAnimation {...propsLoaderAnimation} />
            <Background {...propsBackground} />
            <Header {...propsHeader} />
            <Content {...propsContent} />
        </>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        search: state.search,
        photosGetRandomPhoto: state.photosGetRandomPhoto,
        photosListPhotos: state.photosListPhotos,
        usersProfile: state.usersProfile,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: () => dispatch(logIn()),
        continueLogIn: (code, history) => dispatch(continueLogIn(code, history)),
        onLogOut: (history) => dispatch(logOut(history)),

        onGetRandomPhoto: (user) => dispatch(getRandomPhoto(user)),
        onRandomMouseOver: () => dispatch(randomMouseOver()),
        onRandomMouseOut: () => dispatch(randomMouseOut()),

        getNextPageListPhotos: (user, photosListPhotos) => dispatch(nextPageListPhotos(user, photosListPhotos)),
        getUserData: (history, user, usersProfile) => dispatch(getUserData(history, user, usersProfile)),
        broken: type => dispatch(broken(type)),


    }
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(props => <App {...props} />);
