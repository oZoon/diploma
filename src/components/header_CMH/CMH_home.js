import React from "react";
import { URL_HOME } from "lib/constants";
import { Link } from "react-router-dom";
import Home from 'icons/CMI_home';

export default function HomeButton() {
    return (
        <Link to={URL_HOME} className="header-home">
            <Home />
        </Link>
    )
}
