import config from "./config.json";
import { validateError } from "./utilities";
config.apiHost = process.env.NEXT_PUBLIC_API_HOST;

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
  // throw new Error(validateError(await response?.text()));
  throw new Error(await response?.text());
}

export async function fetchUser() {
  const user = await request("getUser");
  if (!user || !user.id) return null;

  const q1 = `?filters[owner][$eq]=${user.id}&fields=owner,name,open,currency&populate=cover,orders,workers,ratings,favorites`;
  user.myStores = (await request("store", "GET", { query: q1 })).data;

  const q = `?fields=id&populate[workStores][populate]=owner,cover,orders,workers,ratings,favorites&populate[cart]=*&populate[favoriteStores][populate]=owner,cover,ratings&populate[favoriteProducts][populate]=image,variants`;
  const { id, attributes } = (await request("customer", "GET", { query: `/1${q}` })).data;
  user.customerId = id;
  user.workStores = attributes.workStores.data.map(removeAttributes);
  user.favoriteStores = attributes.favoriteStores.data.map(removeAttributes);

  user.cart = await prepareCart(attributes.cart);

  user.favoriteProducts = await prepareFavoriteProducts(attributes.favoriteProducts.data);

  return user;
}

const prepareCart = async (cart) => {
  if (!cart | !cart[0]) return [];

  const ids = cart.map((it) => "filters[id][$in]=" + it.storeId).join("&");
  const stores = (await request("store", "GET", { query: `?${ids}&fields=name,currency,meta` })).data;

  const pIds = cart.map((it) => "filters[id][$in]=" + it.productNumber).join("&");
  const query = `?${pIds}&fields=name&populate[image]=*&populate[variants][populate][options]=*`;
  const { data } = await request("product", "GET", { query });

  stores.forEach((s) => {
    s.currency = s.currency.split("-")[0];
    s.phone = s.meta.phone;
    delete s.meta;
    s.total = 0;

    s.items = cart.filter((item) => {
      if (item.storeId != s.id) return false;
      const product = data.find((p) => p.id == item.productNumber)?.attributes;
      if (!product) return false;

      const variant = product.variants.find((v) => v.barcode == item.barcode);
      if (!variant) return false;

      item.title = product.name + " - " + variant.options.map((o) => o.value).join(" - ");
      item.imageUrl = product.image.data?.attributes.formats.thumbnail.url;
      item.price = variant.price;
      item.discount = product.discount || 0;
      s.total += +item.price;

      return item;
    });
  });

  user.cart = stores.filter((c) => !!c.items[0]);
};

const prepareFavoriteProducts = async (favoriteProducts) => {
  if (!favoriteProducts | !favoriteProducts[0]) return [];

  const ids = favoriteProducts.map((p) => "filters[id][$in]=" + p.attributes.storeId).join("&");
  const stores = (await request("store", "GET", { query: `?${ids}&fields=name,currency,meta` })).data;

  stores.forEach((s) => {
    s.currency = s.currency.split("-")[0];
    s.phone = s.meta.phone;
    delete s.meta;
    s.total = 0;

    s.items = ps
      .filter((p) => p.attributes.storeId == s.id)
      .map((p) => {
        const { name, image, variants } = p.attributes;
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
};

export function removeAttributes(data) {
  data.attributes.id = data.id;
  return data.attributes;
}
