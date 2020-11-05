import React, { useEffect, useState } from "react";
import Home from 'content/home';
import Diploma from 'content/diploma';
import Author from 'content/author';
import Settings from 'content/settings';
import Search from 'content/search';
import SearchHistory from 'content/history';
import Empty from 'content/empty';


import { Route, Switch } from 'react-router-dom';

const Content = (props) => {
    const {
        photosGetRandomPhoto,
        photosListPhotos,
        user,
        getNextPageListPhotos,
    } = props;

    const style = !photosGetRandomPhoto.show ? { display: 'block' } : { display: 'none' };
    const [currentScroll, setCurrentScroll] = useState(0);
    const movedArea = document.body.scrollHeight - document.body.clientHeight;
    useEffect(() => {
        window.onscroll = () => {
            setCurrentScroll(window.pageYOffset)
        }
    }, []);

    const propsHome = {
        photosListPhotos,
        user,
        getNextPageListPhotos,
        movedArea,
        currentScroll,
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
            </Switch>
        </div>
    );

};

export default Content;
