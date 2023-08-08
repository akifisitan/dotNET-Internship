import axios from "axios";
import { getAccessToken } from "../helpers/Auth";

export function createNewProperty(data) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  try {
    const response = axios.postForm("Property", data, config);
    return response;
  } catch (error) {
    return error.response ? error.response : null;
  }
}
