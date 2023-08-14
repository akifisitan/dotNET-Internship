export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function storeUserData(username, roles, token, expiration) {
  localStorage.setItem("username", username);
  localStorage.setItem("roles", JSON.stringify(roles));
  localStorage.setItem("accessToken", token);
  localStorage.setItem("tokenExpiration", expiration);
}

export function clearUserData() {
  localStorage.removeItem("username");
  localStorage.removeItem("roles");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenExpiration");
}

export function getUserData() {
  const username = localStorage.getItem("username");
  const roles = localStorage.getItem("roles");
  return username && roles
    ? { username: username, roles: JSON.parse(roles) }
    : null;
}

export function isTokenExpired() {
  const expiration = localStorage.getItem("tokenExpiration");
  if (Date.parse(expiration) < Date.now()) {
    console.log("Token has expired");
    clearUserData();
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
