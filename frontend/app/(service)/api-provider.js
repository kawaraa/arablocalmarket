import config from "./config.json";
import { validateError } from "./utilities";

export function getURL(key) {
  return config.apiHost + config[key];
}

export async function request(url, method = "GET", data, type = "application/json", arg) {
  const token = window.localStorage.getItem("accessToken");
  const headers = { "Content-Type": type, ...(!token ? {} : { Authorization: `Bearer ${token}` }) };
  const body = JSON.stringify(data);
  const uri = getURL(url) || url;
  const response = await fetch(uri, { method, body, headers, ...arg }).catch(() => null);
  if (response?.ok) return response.json();
  throw new Error(validateError(await response?.text()));
}
