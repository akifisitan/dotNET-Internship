

export function isLoggedIn() {
    return localStorage.getItem("accessToken") !== null;
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}


export function tokenIsExpired() {
    const expiration = localStorage.getItem("tokenExpiration");
    return Date.parse(expiration) < Date.now();
}

