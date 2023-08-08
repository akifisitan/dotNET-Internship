import { Post, Update, Delete } from "./BaseService";

export async function addStatus(status) {
  const body = { value: status };
  const response = await Post("PropertyStatus", body, true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

///// NOT DONE YET ////

export async function updateAuthor(authorId, name, surname) {
  const body = { id: authorId, name: `${name} ${surname}` };
  const response = await Update("Author", body, true);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}

export async function deleteAuthor(authorId) {
  const params = { id: authorId };
  const response = await Delete("Author", true, params);
  console.log(response);
  if (response) {
    return { data: response.data, statusCode: response.status };
  }
  return null;
}
