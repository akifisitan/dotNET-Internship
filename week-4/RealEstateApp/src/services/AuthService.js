import { Post } from "./BaseService";

export async function login(username, password) {
  const body = {
    username: username,
    password: password,
  };
  const response = await Post("api/Authenticate/login", body);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function signup(email, password, username) {
  const body = {
    username: username,
    email: email,
    password: password,
  };
  const response = await Post("api/Authenticate/register", body);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}
