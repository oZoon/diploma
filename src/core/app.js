import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "containers/header";
import Content from "containers/content";
import Unsplash from "lib/unsplashWrap";
import Background from 'content/background';
import LoaderAnimation from 'content/loaderGif';

import {
    logIn,
    logOut,
    authUpdate,
    requestSearch,
    getRandomPhoto,
    randomMouseOver,
    randomMouseOut,
    listPhotos,
} from "core/actions";

// /!q@q$q&q*q(q)q-q=q:q

let App = (props) => {
    const hostname = window && window.location && window.location.hostname;
    console.log(hostname);
    console.log(props);
    const {
        onLogIn,
        onLogOut,
        user,
        authUpdate,
        onSearchString,
        location,
        history,
        onGetRandomPhoto,
        photosGetRandomPhoto,
        photosListPhotos,
        onRandomMouseOver,
        onRandomMouseOut,
        onListPhotos,
    } = props;

    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [currentSearch, setCurrentSearch] = useState(location.search);
    useEffect(() => {
        const { pathname, search } = location;
        // console.log("New path: ", pathname);
        // console.log('new search: ', search);
        setCurrentPath(pathname);
        setCurrentSearch(search);
    }, [location.pathname, location.search]);

    const unsplash = new Unsplash(user.access_token);
    unsplash.logInUpdate(authUpdate, user);

    const propsHeader = {
        onLogIn,
        onLogOut,
        user,
        unsplash,
        onSearchString,
        onGetRandomPhoto,
        onRandomMouseOver,
        onRandomMouseOut,
        history,
    };
    const propsContent = {
        currentPath,
        currentSearch,
        unsplash,
        photosGetRandomPhoto,
        onListPhotos,
    }
    const propsBackground = {
        imgUrl: photosGetRandomPhoto.imgUrl,
        show: photosGetRandomPhoto.show,
    }
    const propsLoaderAnimation = {
        state:
            [
                photosGetRandomPhoto.state,
                photosListPhotos.state,
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
const mapStateToProps = (state) => {
    // console.log('state in mapStateToProps: ', state);
    // console.log('ownProps in mapStateToProps: ', ownProps);
    return {
        user: state.user,
        search: state.search,
        photosGetRandomPhoto: state.photosGetRandomPhoto,
        photosListPhotos: state.photosListPhotos,
        // ownProps,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogIn: (unsplash) => dispatch(logIn(unsplash)),
        onLogOut: (unsplash) => dispatch(logOut(unsplash)),
        authUpdate: (userData) => dispatch(authUpdate(userData)),

        onSearchString: (text, unsplash) => dispatch(requestSearch(text, unsplash)),
        onGetRandomPhoto: (unsplash) => dispatch(getRandomPhoto(unsplash)),
        onRandomMouseOver: () => dispatch(randomMouseOver()),
        onRandomMouseOut: () => dispatch(randomMouseOut()),

        onListPhotos: (unsplash) => dispatch(listPhotos(unsplash)),
    };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(props => <App {...props} />);
