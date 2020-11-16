import React from "react";
import { Link } from "react-router-dom";
import {
    URL_USER_PHOTOS,
    URL_USER_LIKES,
    URL_USER_COLLECTIONS,
    URL_SEARCH,
} from 'lib/constants';
import { getProfileHeader } from "lib/utils";


export default (props) => {
    const { username, userList } = props;
    const profile = getProfileHeader(userList, username);
    if (profile) {
        let collections = (
            <>
                <li>0</li>
                <li>
                    Collections
                </li>
            </>
        )
        if (profile.collections > 0) {
            collections = (
                <>
                    <li>{profile.collections}</li>
                    <li>
                        <Link
                            to={`${URL_USER_COLLECTIONS}=${profile.username}`}
                            className="profile-dark-line-item-link"
                        >
                            Collections
                        </Link>
                    </li>
                </>
            )
        }
        let liked = (
            <>
                <li>0</li>
                <li>
                    Liked
                </li>
            </>
        )
        if (profile.liked > 0) {
            liked = (
                <>
                    <li>{profile.liked}</li>
                    <li>
                        <Link
                            to={`${URL_USER_LIKES}=${profile.username}`}
                            className="profile-dark-line-item-link"
                        >
                            Liked
                        </Link>
                    </li>
                </>
            )
        }
        return (
            <div className="content-profile">
                <div className="profile-background-wrap profile-background-root"></div>
                <img className="profile-avatar" src={profile.avatar} />
                <div className="profile-dark-line">
                    <ul className="profile-dark-line-list">
                        <li>
                            <ul className="profile-dark-line-item">
                                <li>{profile.followers}</li>
                                <li>Followers</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="profile-dark-line-item">
                                <li>{profile.following}</li>
                                <li>Following</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="profile-dark-line-item">
                                <li>{profile.photos}</li>
                                <li>
                                    <Link
                                        to={`${URL_USER_PHOTOS}=${profile.username}`}
                                        className="profile-dark-line-item-link"
                                    >
                                        Photos
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="profile-dark-line-item">
                                {collections}
                            </ul>
                        </li>
                        <li>
                            <ul className="profile-dark-line-item">
                                {liked}
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="profile-white-line">{profile.fullName}
                </div>
                <div className="profile-interests-line">
                    <ul className="profile-interests-line-list">
                        <li className="profile-interests-line-first">Interests:</li>
                        {profile.interests.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    className="profile-interests-line-next"
                                >
                                    <Link
                                        className="profile-interests-line-link"
                                        to={`${URL_SEARCH}=${item}`}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )

    } else {
        return null;
    }
}
