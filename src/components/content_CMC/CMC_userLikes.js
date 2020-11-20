import React from "react";
import { getImageList } from 'lib/utils';
import HomeColumn from 'content/CMC_column';

export default (props) => {
    // console.log(props);
    const likes = getImageList(props.imageList, props.username);

    if (likes) {
        return (
            <div className="content-plug">
                <div className="content-base-user">
                    <HomeColumn {...likes[0]} />
                    <HomeColumn {...likes[1]} />
                    <HomeColumn {...likes[2]} />
                </div>
            </div>
        )
    } else {
        return null;
    }
}
