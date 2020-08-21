import { BASE_URL } from "./BaseUrl";

export const GetItems = async (key, categoryid) => {
  const response = await fetch(`${BASE_URL}/item/?category_id=${categoryid}`, {
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
export const GetItem = async (key, id) => {
  const response = await fetch(`${BASE_URL}/item/${id}`, {
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
export const GetItemsTotalPrice = async (key) => {
  const response = await fetch(`${BASE_URL}/item/price/total`, {
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
export const PostItem = async (newItem) => {
  const response = await fetch(`${BASE_URL}/item`, {
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
export const PutItem = async (updateItem) => {
  const response = await fetch(`${BASE_URL}/item`, {
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
export const DeleteItemWithoutRefund = async (id) => {
  const response = await fetch(`${BASE_URL}/item/${id}`, {
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
export const DeleteItemWithRefund = async (id) => {
  const response = await fetch(`${BASE_URL}/itemrefund/${id}`, {
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
