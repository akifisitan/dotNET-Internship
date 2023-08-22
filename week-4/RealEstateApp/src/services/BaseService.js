import axios from "axios";
import { getAccessToken } from "../helpers/Auth";

export const baseURL = "http://localhost:5000/";

function setConfig(requiresAuth, queryParams) {
  const config = {};
  if (requiresAuth) {
    config["headers"] = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
  }
  if (queryParams) {
    config["params"] = queryParams;
  }
  return config;
}

export async function Get(url, requiresAuth, queryParams) {
  try {
    const config = setConfig(requiresAuth, queryParams);
    const response = await axios.get(`${baseURL}${url}`, config);
    return response;
  } catch (error) {
    return error.response ? error.response : null;
  }
}

export async function Post(url, body, requiresAuth, queryParams) {
  try {
    const config = setConfig(requiresAuth, queryParams);
    const response = await axios.post(`${baseURL}${url}`, body, config);
    return response;
  } catch (error) {
    return error.response ? error.response : null;
  }
}

export async function Update(url, body, requiresAuth, queryParams) {
  try {
    const config = setConfig(requiresAuth, queryParams);
    const response = await axios.put(`${baseURL}${url}`, body, config);
    return response;
  } catch (error) {
    return error.response ? error.response : null;
  }
}

export async function Delete(url, requiresAuth, queryParams) {
  try {
    const config = setConfig(requiresAuth, queryParams);
    const response = await axios.delete(`${baseURL}${url}`, config);
    return response;
  } catch (error) {
    return error.response ? error.response : null;
  }
}
