import config from "./config.json";
import { validateError } from "./utilities";

export function getURL(key) {
  return config.apiHost + config[key];
}

export async function request(url, method = "GET", data, type = "application/json", arg = {}) {
  const token = window.localStorage.getItem("accessToken");
  const headers = {};
  let body = null;
  let aUrl = getURL(url) || url;

  if (token) headers.Authorization = `Bearer ${token}`;
  if (data) {
    if (data.query) aUrl += data.query;
    else if (data.append) body = data;
    else {
      body = JSON.stringify(data);
      headers["Content-Type"] = type;
    }
  }

  const response = await fetch(aUrl, { method, body, headers, ...arg }).catch(() => null);
  if (response?.ok) return response.json();
  throw new Error(validateError(await response?.text()));
}
