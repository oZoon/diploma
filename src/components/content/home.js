import React from 'react';

function Home({ onListPhotos, unsplash, photosListPhotos }) {
    let codeListPhotos = null;
    if (photosListPhotos.json.length > 0) {
        codeListPhotos = (
            <div className="content-column">
                {photosListPhotos.json.map(item => {
                    return (
                        <div className="content-card" key={item.id}>
                            <img src={item.urls.small} className="card-image" />
                            <div className="card-active-elements">
                                <span className="card-username">
                                    <img src={item.user.profile_image.small} className="card-avatar" />
                                    <span className="card-username-text">
                                        <div className="card-username-name">{item.user.name}</div>
                                        <div className="card-username-nickname">@{item.user.username}</div>
                                    </span>
                                </span>
                                <a className="card-download-button" href={item.links.download} target="_blank"><svg className="card-svg" version="1.1" viewBox="0 0 32 32"><path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z" /></svg></a>
                                <button className="card-like-button"><svg className="card-svg" version="1.1" viewBox="0 0 32 32"><path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z" /></svg></button>
                                <button className="card-collection-button"><svg className="card-svg" version="1.1" viewBox="0 0 32 32"><path d="M14 3h4v26h-4zM29 14v4h-26v-4z" /></svg></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            <h5>Home Page</h5>
            <div
                className="header-static-link"
                onClick={() => onListPhotos(unsplash)}
            >
                загрузить последние 10 изображений
            </div>
            {codeListPhotos}
        </div>
    )
}

export default Home;
