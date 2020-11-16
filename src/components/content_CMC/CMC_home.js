import React, { useEffect, useState } from "react";
import HomeColumn from 'content/CMC_column';

function Home(props) {
    const {
        photosListPhotos,
        user,
        getNextPageListPhotos,
    } = props;

    const [currentScroll, setCurrentScroll] = useState(0);
    const heightMin = Math.min(photosListPhotos.sorted[0].height, photosListPhotos.sorted[1].height, photosListPhotos.sorted[2].height);
    const movedArea = document.body.scrollHeight - document.body.clientHeight;

    useEffect(() => {
        let state = true;
        window.onscroll = () => {
            setCurrentScroll(window.pageYOffset)
        }
        if (
            state &&
            user.isLoggedIn &&
            !photosListPhotos.state &&
            (
                heightMin == 0 ||
                heightMin != 0 && movedArea - currentScroll * 4 / 3 < 0
            )
        ) {
            getNextPageListPhotos(user, photosListPhotos);
            setCurrentScroll(window.pageYOffset);
        }
        return () => {
            state = false;
            setCurrentScroll(window.pageYOffset);
        }
    });

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
