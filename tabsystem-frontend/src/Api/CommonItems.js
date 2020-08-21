import { BASE_URL } from "./BaseUrl";

export const GetCommonItems = async (key) => {
  const response = await fetch(`${BASE_URL}/commonitem`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const GetCommonItem = async (key, id) => {
  const response = await fetch(`${BASE_URL}/commonitem/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const PostCommonItem = async (newItem) => {
  const response = await fetch(`${BASE_URL}/commonitem`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(newItem),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const PutCommonItem = async (updateItem) => {
  const response = await fetch(`${BASE_URL}/commonitem`, {
    method: "PUT",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(updateItem),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const DeleteCommonItem = async (id) => {
  const response = await fetch(`${BASE_URL}/commonitem/${id}`, {
    method: "DELETE",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
  });
  const data = await response.json();
  console.log(data);
  return data;
};
