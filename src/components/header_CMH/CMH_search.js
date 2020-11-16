import React from "react";
import Search from 'icons/CMI_search';

const ViewSearch = (props) => {
    const {
        user,
        history,
    } = props;

    let result;
    const request = (text) => {
        history.push(`/search?text=${text}`, 'search');
    }
    if (user.isLoggedIn) {
        result = (
            <>
                <input
                    type="text"
                    className="header-search-input"
                    onKeyUp={(ev) => {
                        if (ev.key == "Enter" && ev.target.value != '') {
                            request(ev.target.value);
                            ev.target.value = '';
                        }
                    }}
                />
                <button
                    className="header-search-button"
                    onClick={() => {
                        const text = document.querySelector(".header-search-input").value;
                        if (text) {
                            request(text);
                            document.querySelector(".header-search-input").value = '';
                        }
                    }}
                >
                    <Search />
                </button>
            </>
        )
    } else {
        result = (
            <>
                <input type="text" className="header-search-input" />
                <button className="header-search-button">
                    <Search />
                </button>
            </>
        )

    }
    return result;
};

export default ViewSearch;
