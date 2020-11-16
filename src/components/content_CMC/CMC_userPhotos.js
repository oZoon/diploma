import React from "react";
import { getProfilePhotos } from 'lib/utils';
import HomeColumn from 'content/CMC_column';

export default (props) => {
    // console.log(props);
    const { username, photosList } = props;
    const photos = getProfilePhotos(photosList, username);

    if (photos) {
        return (
            <div className="content-plug">
                <div className="content-base-user">
                    <HomeColumn {...photos[0]} />
                    <HomeColumn {...photos[1]} />
                    <HomeColumn {...photos[2]} />
                </div>
            </div>
        )
    } else {
        return null;
    }
}
