import { BASE_URL } from "./BaseUrl";

export const GetTabs = async (key) => {
  const response = await fetch(`${BASE_URL}/tab`, {
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
export const GetTabById = async (key, id) => {
  const response = await fetch(`${BASE_URL}/tab/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const GetUserTabs = async (key) => {
  const response = await fetch(`${BASE_URL}/user/tabs`, {
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
export const GetUserTabById = async (key, id) => {
  const response = await fetch(`${BASE_URL}/user/tabs/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const GetUserTabItems = async (key, id) => {
  const response = await fetch(`${BASE_URL}/user/tabs/${id}/items`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const GetTabsTotalBalance = async (key) => {
  const response = await fetch(`${BASE_URL}/tab/balance/total`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const PostTab = async (newTab) => {
  const response = await fetch(`${BASE_URL}/tab`, {
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
    body: JSON.stringify(newTab),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const PutTab = async (updateTab) => {
  const response = await fetch(`${BASE_URL}/tab`, {
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
    body: JSON.stringify(updateTab),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const AddCreditToTab = async (tabidandcredit) => {
  const response = await fetch(`${BASE_URL}/addcredit`, {
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
    body: JSON.stringify(tabidandcredit),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const DeleteTab = async (id) => {
  const response = await fetch(`${BASE_URL}/tab/${id}`, {
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
