import React from 'react';

function Home({ onListPhotos, unsplash }) {
    return (
        <div>
            <h5>Home Page</h5>
            <div
                className="header-static-link"
                onClick={() => onListPhotos(unsplash)}
            // onMouseOver={() => onRandomMouseOver()}
            // onMouseOut={() => onRandomMouseOut()}
            >
                загрузить последние 10 изображений
            </div>

        </div>
    )
}

export default Home;
