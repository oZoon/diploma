import React, { useEffect, useState } from "react";
import HomeColumn from 'content/CMC_column';

function Home(props) {
    const {
        photosListPhotos,
        user,
        getNextPageListPhotos,
    } = props;

    const [currentScroll, setCurrentScroll] = useState(0);
    const [heightMin, setHeightMin] = useState(Math.max.apply(null, [500, photosListPhotos.heightMin]));
    const [whellDelta, setWhellDelta] = useState(0);

    useEffect(() => {
        window.onscroll = () => {
            setCurrentScroll(window.pageYOffset)
        }
        window.onwheel = ({ deltaY }) => {
            setWhellDelta(Math.abs(deltaY));
        }
        setHeightMin(Math.max.apply(null, [500, photosListPhotos.heightMin]));
        if (
            user.isLoggedIn &&
            !photosListPhotos.state &&
            (
                (heightMin == 500 && currentScroll == 0 && whellDelta == 0) ||
                (heightMin != 0 && heightMin - (currentScroll + whellDelta * 2) < 0)
            )
        ) {
            setHeightMin(heightMin + whellDelta * 8);
            getNextPageListPhotos(user, photosListPhotos);
        }
    }, [currentScroll, user.isLoggedIn]);

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
