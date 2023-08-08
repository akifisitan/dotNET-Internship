import axios from "axios";
import { getAccessToken } from "../helpers/Auth";
import { baseURL } from "./BaseService";

export function createNewProperty(data) {
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
    for (const file of data.photos) {
      form.append("Photos", file);
    }
    const response = axios.post(`${baseURL}Property`, form, config);
    return response;
  } catch (error) {
    console.log(error);
    return error.response ? error.response : null;
  }
}
