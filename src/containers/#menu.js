// скопировано с header.js

import React from "react";
import { AppBar, Container, Toolbar, Divider } from "@material-ui/core";
import useStyles from "lib/styles";
import Auth from 'header/auth';
import HomeButton from 'header/home';
import ViewSearch from 'header/search';
import StaticPages from 'header/staticPages';

const Header = (props) => {
    // console.log('props in Header: ', props);
    const classes = useStyles();
    const {
        onLogIn,
        onLogOut,
        user,
        unsplash,
        onSearchString,
    } = props;

    const propsAuth = {
        onLogIn,
        onLogOut,
        user,
        unsplash,
    };
    const propsSearch = {
        onSearchString,
        user,
        unsplash,
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Container fixed>
                <Toolbar>
                    <HomeButton />
                    <ViewSearch {...propsSearch} />
                    <StaticPages />
                    <Auth {...propsAuth} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
