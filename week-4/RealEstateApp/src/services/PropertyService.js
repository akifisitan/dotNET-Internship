import axios from "axios";
import { getAccessToken } from "../helpers/Auth";
import { baseURL, Get, Update } from "./BaseService";

async function createNewProperty(data) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  try {
    const form = new FormData();
    form.append("EndDate", data.endDate);
    form.append("PropertyTypeId", data.propertyTypeId);
    form.append("PropertyStatusId", data.propertyStatusId);
    form.append("CurrencyId", data.currencyId);
    form.append("Price", data.price);
    form.append("Latitude", data.latitude);
    form.append("Longitude", data.longitude);
    for (const image of data.images) {
      form.append("Images", image);
    }
    console.log(form);
    const response = await axios.post(`${baseURL}Property`, form, config);
    console.log("Axios response");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response ? error.response : null;
  }
}

export async function createProperty(data) {
  const response = await createNewProperty(data);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function updateProperty(data) {
  const response = await Update("Property", data, true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function getUserShowcaseData() {
  const response = await Get("Property/getUserShowcaseData", true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function getAllMapData() {
  const response = await Get("Property/getAllMapData", false);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function getPaginated(pageNumber, filters) {
  const params = { ...filters, page: pageNumber, pageSize: 12 };
  const response = await Get("Property/getPaginated", false, params);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function getAnalyticsByUserId() {
  const response = await Get("Property/getAnalyticsByUserId", true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}
