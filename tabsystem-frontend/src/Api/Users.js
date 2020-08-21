import { BASE_URL } from "./BaseUrl";

export const GetUsers = async (key) => {
  const response = await fetch(`${BASE_URL}/users`, {
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

export const GetUserOfTab = async (key, id) => {
  const response = await fetch(`${BASE_URL}/userOfTab/${id}`, {
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
