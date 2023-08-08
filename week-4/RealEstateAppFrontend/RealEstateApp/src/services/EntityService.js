import { Get, Post, Update, Delete } from "./BaseService";

export async function getAll(entityPath) {
  const response = await Get(`${entityPath}/list`, true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function insertEntity(entityPath, data) {
  const response = await Post(entityPath, data, true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function deleteEntity(entityPath, id) {
  const response = await Delete(entityPath, true, { id: id });
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function updateEntity(entityPath, data) {
  const response = await Update(entityPath, data, true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function getById(entityPath, id) {
  const response = await Get(entityPath, true, { id: id });
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}
