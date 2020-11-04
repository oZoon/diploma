import React from "react";
import { URL_AUTHOR, URL_DIPLOMA } from "lib/constants";
import { Link } from "react-router-dom";

const StaticPages = (props) => {
    const {
        onGetRandomPhoto,
        onRandomMouseOver,
        onRandomMouseOut,
        user,
    } = props;
    let result = null;
    if (user.isLoggedIn) {
        result = (
            <div
                className="header-static-link"
                onClick={() => onGetRandomPhoto()}
                onMouseOver={() => onRandomMouseOver()}
                onMouseOut={() => onRandomMouseOut()}
            >
                RANDOM
            </div>
        )
    }
    return (
        <div className="header-static-container">
            <Link to={URL_AUTHOR} className="header-static-link">
                об авторе
            </Link>
            <Link to={URL_DIPLOMA} className="header-static-link">
                о дипломной работе
            </Link>
            {result}
        </div>
    );
};

export default StaticPages;
