const checkSession = () => {
    const jwtCookie = document.cookie.split(';').find(cookie => cookie.startsWith('eznema='));
    if (jwtCookie) {
        return true;
    }
    return false;
}