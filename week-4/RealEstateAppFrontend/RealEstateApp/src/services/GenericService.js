import { Get, Post, Update, Delete } from "./BaseService";

export async function getAll(entity) {
  const response = await Get(`${entity}/list`, true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function getById(entity, id) {
  const response = await Get(entity, true, { id: id });
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}
