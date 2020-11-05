import Unsplash, { toJson } from "unsplash-js";
import { URL_SITE, ACCESS_KEY, SECRET } from "lib/constants";

class UnsplashWrap {
    constructor(props) {
        let unsplashInit = {
            accessKey: ACCESS_KEY,
            secret: SECRET,
            callbackUrl: URL_SITE,
        };
        if (!props) {
            unsplashInit.bearerToken = props;
        }
        this.unsplash = new Unsplash(unsplashInit);
        this.authenticationUrl = this.unsplash.auth.getAuthenticationUrl([
            "public",
            "write_likes",
        ]);
    }
    auth() {
        if (!this.authCheckCode()) {
            this.authGetCode();
        }
    }

    authGetCode() {
        location.assign(this.authenticationUrl);
    }
    authCheckCode() {
        if (location.search) {
            if (location.search.includes("code=")) {
                return location.search.split("code=")[1];
            } else {
                return false;
            }
        }
    }

    logInUpdate(authUpdate, user) {
        if (!user.isLoggedIn) {
            const code = this.authCheckCode();
            if (code) {
                if (!user.access_token) {
                    this.unsplash.auth
                        .userAuthentication(code)
                        .then(toJson)
                        .then((json) => {
                            if (json.access_token) {
                                const access_token = json.access_token;
                                this.unsplash.auth.setBearerToken(
                                    json.access_token,
                                );
                                this.unsplash.currentUser
                                    .profile()
                                    .then(toJson)
                                    .then((json) => {
                                        // console.log('json in logInUpdate: ', json);
                                        const userData = {
                                            code: code,
                                            access_token: access_token,
                                            first_name: json.first_name,
                                            profile_image: json.profile_image.medium,
                                            id: json.id,
                                            username: json.username,
                                        }
                                        authUpdate({ ...userData });
                                        history.pushState({ ...userData }, 'loggedIn', URL_SITE);
                                    });

                            } else {
                                // error - invalid code
                            }
                        });
                }
            }
        }
    }

    getRandomPhoto() {
        // console.log(this.unsplash);
        return this.unsplash.photos.getRandomPhoto({ count: '1' });
    }
    getListPhotos(page){
        return this.unsplash.photos.listPhotos(page, 10, "latest");
    }
}

export default UnsplashWrap;
