import React from "react";
import { URL_HOME } from "lib/constants";
import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        <Link to={URL_HOME} className="header-home">
            <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
        </Link>
    )
}
