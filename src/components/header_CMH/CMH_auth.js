import React from "react";
import { Link } from 'react-router-dom';
import UserMenu from 'lib/outSide';

const Auth = (props) => {
    const {
        onLogIn,
        onLogOut,
        user,
        history,
    } = props;
    const [display, setDisplay] = React.useState({ display: 'none' });

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplay({ display: 'block' });
    };

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplay({ display: 'none' });
    };
    let result = null;

    if (user.isLoggedIn) {
        result = (
            <button className="header-logged-button" onClick={(e) => handleClick(e)}>
                <img src={user.jsonProfile.profile_image.medium} className="header-logged-avatar" />
                {user.jsonProfile.first_name}
                <UserMenu onClick={(e) => handleClose(e)}>
                    <ul style={display} className="header-logged-menu" onClick={(e) => handleClose(e)}>
                        <li className="header-logged-menu-item" onClick={(e) => handleClose(e)}>
                            <Link to="/settings" className="header-logged-menu-link">
                                Настройки
                        </Link>
                        </li>
                        <li className="header-logged-menu-item" onClick={(e) => handleClose(e)}>
                            <Link to="/history" className="header-logged-menu-link">
                                История поиска
                        </Link>
                        </li>
                        <li className="header-logged-menu-item" onClick={(e) => handleClose(e)}>
                            <span className="header-logged-menu-link" onClick={() => onLogOut(history)}>
                                Выход
                        </span>
                        </li>
                    </ul>
                </UserMenu>
            </button>

        );
    } else {
        result = (
            <button className="header-login-button" onClick={() => { onLogIn() }}>
                Вход
            </button>
        );
    }
    return result;
};

export default Auth;
