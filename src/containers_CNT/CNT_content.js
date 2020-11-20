import React, { useEffect, useState } from "react";
import Home from 'content/CMC_home';
import Diploma from 'content/CMC_diploma';
import Author from 'content/CMC_author';
import Settings from 'content/CMC_settings';
import Search from 'content/CMC_search';
import SearchHistory from 'content/CMC_history';
import Empty from 'content/CMC_empty';
import OtherUser from 'content/CMC_otherUser';

import { Route, Switch } from 'react-router-dom';

const Content = (props) => {
    const {
        photosGetRandomPhoto,
        photosListPhotos,
        user,
        getNextPageListPhotos,
        getUserData,
        history,
        usersProfile,
        broken,
    } = props;

    const style = !photosGetRandomPhoto.show ? { display: 'block' } : { display: 'none' };

    const propsHome = {
        photosListPhotos,
        user,
        getNextPageListPhotos,
    }
    const propsOtherUser = {
        user,
        getUserData,
        history,
        usersProfile,
        broken,
    }

    return (
        <div className="content" style={style}>
            <Empty />
            <Switch>
                <Route exact path="/">
                    <Home {...propsHome} />
                </Route>
                <Route path="/diploma" component={Diploma} />
                <Route path="/author" component={Author} />
                <Route path="/settings" component={Settings} />
                <Route path="/search" component={Search} />
                <Route path="/history" component={SearchHistory} />
                <Route exact path="/user">
                    <OtherUser {...propsOtherUser} />
                </Route>
            </Switch>
        </div>
    );

};

export default Content;
