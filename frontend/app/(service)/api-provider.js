import config from "./config.json";
import { validateError } from "./utilities";

export function getURL(key) {
  return config.apiHost + config[key];
}

export async function request(url, method = "GET", data, type = "application/json", ...arg) {
  const headers = { "Content-Type": type };
  if (localStorage.accessToken) headers.Authorization = `Bearer ${localStorage.accessToken}`;
  const response = await fetch(getURL(url) || url, { method, body: JSON.stringify(data), headers, ...arg });
  if (response.ok) return response.json();
  throw new Error(validateError(await response.text()));
}

export async function getUser(token) {
  try {
    //   const response = await fetch(config.backendDomain + "/user", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   if (response.ok) return response.json();

    return { id: "111", hasStore: true };
  } catch (error) {
    return null;
  }
}
