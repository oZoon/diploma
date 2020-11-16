import React from "react";
import Auth from 'header/CMH_auth';
import HomeButton from 'header/CMH_home';
import ViewSearch from 'header/CMH_search';
import StaticPages from 'header/CMH_staticPages';

const Header = (props) => {
    const {
        onLogIn,
        onLogOut,
        user,
        onGetRandomPhoto,
        onRandomMouseOver,
        onRandomMouseOut,
        history,
    } = props;

    const propsAuth = {
        onLogIn,
        onLogOut,
        user,
        history,
    };
    const propsSearch = {
        user,
        history,
    }
    const propsStaticPages = {
        onGetRandomPhoto,
        onRandomMouseOver,
        onRandomMouseOut,
        user,
    }

    return (
        <nav className="header">
            <div className="container">
                <HomeButton />
                <ViewSearch {...propsSearch} />
                <StaticPages {...propsStaticPages} />
                <Auth {...propsAuth} />
            </div>
        </nav>
    );
};

export default Header;
