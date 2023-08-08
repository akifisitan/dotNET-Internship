export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function storeToken(token, expiration) {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("tokenExpiration", expiration);
}

export function clearToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenExpiration");
}

export function isLoggedIn() {
  return getAccessToken() !== null;
}

export function isTokenExpired() {
  const expiration = localStorage.getItem("tokenExpiration");
  if (Date.parse(expiration) < Date.now()) {
    console.log("Token has expired");
    clearToken();
    return true;
  }
  // const remainingTime = Date.parse(expiration) - Date.now();
  // console.log(
  //   `Remaining time on token: ${((remainingTime * 1000) / 60000000).toFixed(
  //     1
  //   )} minutes.`
  // );
  return false;
}
