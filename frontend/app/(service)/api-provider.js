import config from "./config.json";
import { validateError } from "./utilities";

export function getURL(key) {
  return config.apiHost + config[key];
}

export async function serverRequest(url, method = "GET", data, type = "application/json", arg = {}) {
  let aUrl = getURL(url) || url;
  const headers = { "Content-Type": type };
  let body = null;

  if (data) {
    if (data.token) headers.Authorization = `Bearer ${data.token}`;
    if (data.query) aUrl += data.query;
    if (data.body) body = JSON.stringify(data.body);
  }

  const response = await fetch(aUrl, { method, body, headers, ...arg });
  if (response?.ok) return response.json();
  throw new Error(await response?.text());
}

export async function request(url, method = "GET", data, type = "application/json", arg = {}) {
  const token = window.localStorage.getItem("accessToken");
  const headers = {};
  let body = null;
  let aUrl = getURL(url) || url;

  const prepareBody = (data) => {
    body = JSON.stringify(data);
    headers["Content-Type"] = type;
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  if (data) {
    if (data.append) body = data;
    else if (!data.query) prepareBody(data);
    else {
      aUrl += data.query;
      if (data.body?.append) body = data.body;
      else if (data.body) prepareBody(data.body);
    }
  }

  const response = await fetch(aUrl, { method, body, headers, ...arg }).catch(() => null);
  if (response?.ok) return response.json();
  throw new Error(validateError(await response?.text()));
}

export async function fetchUser() {
  const user = await request("getUser");

  const q = `?fields=id&populate[workStores][populate]=owner,cover,orders,workers,ratings,favorites&populate[favoriteStores][fields]=id&&populate[favoriteProducts][fields]=id`;
  const { attributes } = (await request("customer", "GET", { query: `/1${q}` })).data;
  user.favoriteStores = attributes.favoriteStores.data.map(({ id }) => id);
  user.favoriteProducts = attributes.favoriteProducts.data.map(({ id }) => id);
  user.workStores = attributes.workStores.data;

  const q1 = `?filters[owner][$eq]=${user.id}&fields=owner,name,open&populate=cover,orders,workers,ratings,favorites`;
  const res = await request("store", "GET", { query: q1 });
  user.myStores = res.data;

  return user;
}
