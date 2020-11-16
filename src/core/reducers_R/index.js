import init from 'reducers/R_init';
import usersProfile from 'reducers/R_usersProfile';
import user from 'reducers/R_loggedInUser';
import search from 'reducers/R_search';
import photosGetRandomPhoto from 'reducers/R_photosGetRandomPhoto';
import photosListPhotos from 'reducers/R_photosListPhotos';

function reducers(state = init, action) {
    return {
        user: user(state.user, action),
        search: search(state.search, action),
        photosGetRandomPhoto: photosGetRandomPhoto(state.photosGetRandomPhoto, action),
        photosListPhotos: photosListPhotos(state.photosListPhotos, action),
        usersProfile: usersProfile(state.usersProfile, action),
    };
}

export default reducers;
