import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "containers/header";
import Content from "containers/content";
import Background from 'content/background';
import LoaderAnimation from 'content/loaderGif';
import { checkCode } from 'lib/utils';

// import {
//     getRandomPhoto,
//     randomMouseOver,
//     randomMouseOut,
//     listPhotos,
// } from "core/actions";
import { getRandomPhoto, randomMouseOver, randomMouseOut } from "core/actionRandomPhoto";
import { logIn, continueLogIn, logOut } from 'core/actionUser';
import { listPhotos } from 'core/actionListPhotos.js';

// /!q@q$q&q*q(q)q-q=q:q

let App = (props) => {
    // console.log(props);
    const {
        onLogIn,
        onLogOut,
        user,
        location,
        history,
        onGetRandomPhoto,
        photosGetRandomPhoto,
        photosListPhotos,
        onRandomMouseOver,
        onRandomMouseOut,
        onListPhotos,
        continueLogIn,
    } = props;

    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [currentSearch, setCurrentSearch] = useState(location.search);
    useEffect(() => {
        const { pathname, search } = location;
        // console.log("New path: ", pathname);
        // console.log('new search: ', search);
        setCurrentPath(pathname);
        setCurrentSearch(search);
        const code = checkCode();
        if (code) continueLogIn(code, history);
    }, [location.pathname, location.search]);

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
        onListPhotos,
        photosListPhotos,
        user,
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

        onListPhotos: (user) => dispatch(listPhotos(user)),
    };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default withRouter(props => <App {...props} />);
