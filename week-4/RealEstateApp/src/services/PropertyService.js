import axios from "axios";
import { getAccessToken } from "../helpers/Auth";
import { baseURL } from "./BaseService";
import { Get } from "./BaseService";

export async function createNewProperty(data) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  try {
    const form = new FormData();
    form.append("StartDate", data.startDate);
    form.append("EndDate", data.endDate);
    form.append("PropertyTypeId", data.propertyTypeId);
    form.append("PropertyStatusId", data.propertyStatusId);
    form.append("CurrencyId", data.currencyId);
    form.append("Price", data.price);
    for (const photo of data.photos) {
      form.append("Photos", photo);
    }
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

export async function listPropertiesByUser() {
  const response = await Get("Property/getByUserId", true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}