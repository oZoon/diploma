import React from "react";
import HomeColumn from 'content/column';

function Home(props) {
    const {
        photosListPhotos,
        user,
        getNextPageListPhotos,
        movedArea,
        currentScroll,
    } = props;

    if (
        user.isLoggedIn &&
        !photosListPhotos.state &&
        (
            photosListPhotos.sorted[0].height + photosListPhotos.sorted[1].height + photosListPhotos.sorted[2].height == 0 ||
            (
                photosListPhotos.sorted[0].height + photosListPhotos.sorted[1].height + photosListPhotos.sorted[2].height != 0 &&
                movedArea - 2 * currentScroll < 0
            )
        )
    ) {
        // getNextPageListPhotos(user, photosListPhotos);
    }

    let codeListPhotos = null;
    if (user.isLoggedIn) {
        codeListPhotos = (
            <>
                <HomeColumn {...photosListPhotos.sorted[0]} />
                <HomeColumn {...photosListPhotos.sorted[1]} />
                <HomeColumn {...photosListPhotos.sorted[2]} />
            </>
        )
    }

    return (
        <div className="content-plug">
            <div className="content-base">
                {codeListPhotos}
            </div>
        </div>
    )
}

export default Home;
