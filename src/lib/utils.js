export const checkCode = () => {
    return location.search.includes('?code=') ? location.search.split('?code=')[1] : false;
}
