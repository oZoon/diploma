import React from "react";
import Home from 'content/home';
import Diploma from 'content/diploma';
import Author from 'content/author';
import Settings from 'content/settings';
import Search from 'content/search';
import SearchHistory from 'content/history';
import Empty from 'content/empty';

import { Route, Switch } from 'react-router-dom';

const Content = (props) => {
    // console.log('props in Content: ', props);
    const {
        photosGetRandomPhoto,
        onListPhotos,
        photosListPhotos,
    } = props;
    const propsHome = {
        onListPhotos,
        photosListPhotos,
    }
    const style = !photosGetRandomPhoto.show ? { display: 'block' } : { display: 'none' };
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

// бесконечный скролл
// http://jsfiddle.net/Symphony/mgx8qsgx/
// https://codesandbox.io/s/w3w89k7x8?file=/src/index.js
// https://www.npmjs.com/package/react-infinite-scroll-component
