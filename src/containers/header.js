import React from "react";
import Auth from 'header/auth';
import HomeButton from 'header/home';
import ViewSearch from 'header/search';
import StaticPages from 'header/staticPages';

const Header = (props) => {
    // console.log('props in Header: ', props);
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
