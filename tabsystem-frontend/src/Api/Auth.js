import { BASE_URL } from "./BaseUrl";

export const Register = async (newUser) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(newUser),
  });
  const data = await response.json();
  return data;
};

export const Login = async (user) => {
  console.log(user);
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: { "content-type": "application/json", accept: "application/json" },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(user),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const Logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
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
  });
};
