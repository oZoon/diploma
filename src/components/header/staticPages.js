import React from "react";
import { URL_AUTHOR, URL_DIPLOMA } from "lib/constants";
import { Link } from "react-router-dom";

const StaticPages = ({
    onGetRandomPhoto,
    unsplash,
    onRandomMouseOver,
    onRandomMouseOut,
    user,
}) => {
    let result = null;
    if (user.isLoggedIn) {
        result = (
            <div
                className="header-static-link"
                onClick={() => onGetRandomPhoto(unsplash)}
                onMouseOver={() => onRandomMouseOver()}
                onMouseOut={() => onRandomMouseOut()}
            >
                RANDOM
            </div>
        )
    }

    return (
        <div className="header-static-container">
            <Link to={URL_AUTHOR} className="header-static-link">
                об авторе
            </Link>
            <Link to={URL_DIPLOMA} className="header-static-link">
                о дипломной работе
            </Link>
            {result}
        </div>
    );
};

export default StaticPages;
/*
[
    {
        "id": "LBI7cgq3pbM",
        "created_at": "2016-05-03T11:00:28-04:00",
        "updated_at": "2016-07-10T11:00:01-05:00",
        "width": 5245,
        "height": 3497,
        "color": "#60544D",
        "blur_hash": "LoC%a7IoIVxZ_NM|M{s:%hRjWAo0",
        "likes": 12,
        "liked_by_user": false,
        "description": "A man drinking a coffee.",
        "user": {
            "id": "pXhwzz1JtQU",
            "username": "poorkane",
            "name": "Gilbert Kane",
            "portfolio_url": "https://theylooklikeeggsorsomething.com/",
            "bio": "XO",
            "location": "Way out there",
            "total_likes": 5,
            "total_photos": 74,
            "total_collections": 52,
            "instagram_username": "instantgrammer",
            "twitter_username": "crew",
            "profile_image": {
                "small": "https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32",
                "medium": "https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=64&w=64",
                "large": "https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=128&w=128"
            },
            "links": {
                "self": "https://api.unsplash.com/users/poorkane",
                "html": "https://unsplash.com/poorkane",
                "photos": "https://api.unsplash.com/users/poorkane/photos",
                "likes": "https://api.unsplash.com/users/poorkane/likes",
                "portfolio": "https://api.unsplash.com/users/poorkane/portfolio"
            }
        },
        "current_user_collections": [ // The *current user's* collections that this photo belongs to.
            {
                "id": 206,
                "title": "Makers: Cat and Ben",
                "published_at": "2016-01-12T18:16:09-05:00",
                "last_collected_at": "2016-06-02T13:10:03-04:00",
                "updated_at": "2016-07-10T11:00:01-05:00",
                "cover_photo": null,
                "user": null
            },
            // ... more collections
        ],
        "urls": {
            "raw": "https://images.unsplash.com/face-springmorning.jpg",
            "full": "https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg",
            "regular": "https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=1080&fit=max",
            "small": "https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=400&fit=max",
            "thumb": "https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=200&fit=max"
        },
        "links": {
            "self": "https://api.unsplash.com/photos/LBI7cgq3pbM",
            "html": "https://unsplash.com/photos/LBI7cgq3pbM",
            "download": "https://unsplash.com/photos/LBI7cgq3pbM/download",
            "download_location": "https://api.unsplash.com/photos/LBI7cgq3pbM/download"
        }
    },
    // ... more photos
]
*/