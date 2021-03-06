import React from "react";
import { getImageList } from 'lib/utils';
import HomeColumn from 'content/CMC_column';

export default (props) => {
    // console.log(props);
    const photos = getImageList(props.imageList, props.username);

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
