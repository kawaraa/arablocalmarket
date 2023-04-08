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

  const q1 = `?filters[owner][$eq]=${user.id}&fields=owner,name,open&populate=cover,orders,workers,ratings,favorites`;
  user.myStores = (await request("store", "GET", { query: q1 })).data;

  const q = `?fields=id&populate[workStores][populate]=owner,cover,orders,workers,ratings,favorites&populate[cart]=*&populate[favoriteStores]=*&populate[favoriteProducts][populate]=image,variants`;
  const { id, attributes } = (await request("customer", "GET", { query: `/1${q}` })).data;
  user.customerId = id;
  user.workStores = attributes.workStores.data;
  user.favoriteStores = attributes.favoriteStores.data;
  user.cart = attributes.cart;

  const ps = attributes.favoriteProducts.data;
  const ids = ps.map((p) => "filters[id][$in]=" + p.attributes.storeId).join("&");
  const stores = (await request("store", "GET", { query: `?${ids}&fields=name,currency,meta` })).data;

  stores.forEach((s) => {
    s.currency = s.currency.split("-")[0];
    s.phone = s.meta.phone;
    delete s.meta;
    s.items = ps
      .filter((p) => p.attributes.storeId == s.id)
      .map((p) => {
        const { name, image, variants } = p.attributes;
        s.total = 0;
        s.total += +variants[0].price;
        return {
          productNumber: p.id,
          barcode: variants[0].barcode,
          title: name,
          imageUrl: image.data?.attributes?.url,
          price: variants[0].price,
          discount: p.discount || 0,
        };
      });
  });

  user.favoriteProducts = stores;

  return user;
}
