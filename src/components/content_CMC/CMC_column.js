import React from "react";
import { Link } from "react-router-dom";
import {
    PHOTO_WIDTH,
} from 'lib/constants';
import { URL_USER_PROFILE } from 'lib/constants';

import Download from 'icons/CMI_download';
import Likes from 'icons/CMI_likes';
import Collection from 'icons/CMI_collection';

const column = (props) => {
    return (
        <div className="content-column">
            {props.list.map(item => {
                const height = PHOTO_WIDTH * item.height / item.width;
                const ID = `id-${item.id}`
                return (
                    <div className="content-card" key={item.id}>
                        <img src={item.urls.small} className="card-image" height={height} width={PHOTO_WIDTH} />
                        <div className="card-active-elements">
                            <Link
                                className="card-userplate"
                                to={`${URL_USER_PROFILE}=${item.user.username}`}
                            >
                                <img src={item.user.profile_image.small} className="card-userplate-avatar" />
                                <span className="card-userplate-text">
                                    <div className="card-userplate-name">{item.user.name}</div>
                                    <div className="card-userplate-nickname">@{item.user.username}</div>
                                </span>
                            </Link>

                            <a className="card-download-button" href={item.links.download} target="_blank"><Download /></a>
                            <button className="card-like-button"><Likes /></button>
                            <button className="card-collection-button"><Collection /></button>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default column;
