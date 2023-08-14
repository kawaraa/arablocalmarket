"use client";
import React, { createContext, useState, useEffect } from "react";
import { fetchUser, registerServiceWorker, mergeCarts, syncUserCart } from "./(service)/api-provider";
import { Cookies } from "./(service)/utilities";
import ScrollToTopBtn from "./(component)/scroll-to-top-btn";
import ImagePreview from "./(component)/(styled)/image-preview";
import Messages from "./(component)/(styled)/messages";
import SelectLanguage from "./(component)/select-language";
import shdCnt from "./(layout)/json/shared-content.json";
const currency = process.env.NEXT_PUBLIC_CURRENCY || "€";

export const AppSessionContext = createContext();

export default function AppSessionContextProvider({ children, language, theme }) {
  const [messages, setMessages] = useState([]);
  const [lang, setLang] = useState(language);
  const [themeMode, setThemeMode] = useState(theme);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [range, setRange] = useState(1.5);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ loading: true });

  const setAppLoading = (loading) => {
    const loader = document.getElementById("global-screen-loader");
    if (loading) loader.style.display = "flex"; // elements[0].style.opacity = "0";
    else loader.style.display = "none"; // elements[0].style.opacity = "1";
  };
  const addMessage = (msg) => setMessages([...messages, msg]);

  const updateLang = (lang) => {
    if (Cookies.get("lang") != lang) Cookies.set("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.classList.remove("en", "ar");
    document.documentElement.classList.add(lang);
    setLang(lang);
  };
  const updateThemeMode = (mode) => {
    if (Cookies.get("themeMode") != mode) Cookies.set("themeMode", mode);
    window.localStorage.setItem("themeMode", mode);
    setThemeMode(mode);
    document.documentElement.classList.remove("dark", "light", "auto");

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (mode === "dark" || (mode == "auto" && systemDark)) document.documentElement.classList.add("dark");
    else document.documentElement.classList.add("light");
  };
  const updateCoordinates = (coordinates) => {
    Cookies.set("coordinates", `${coordinates[0]}:${coordinates[1]}`);
    window.localStorage.setItem("coordinates", `${coordinates[0]}:${coordinates[1]}`);
    setCoordinates(coordinates);
  };
  const updateRange = (range) => {
    Cookies.set("range", range);
    window.localStorage.setItem("range", range);
    setRange(range);
  };
  const updateUser = (user) => {
    setAppLoading(true);
    const localCart = JSON.parse(window.localStorage.getItem("cart")) || [];
    if (!user) setCart(localCart);
    else {
      const cart = mergeCarts(user.cart, localCart);
      setCart(cart);
      window.localStorage.removeItem("cart");
      delete user.cart;
      syncUserCart(cart).catch(() => null);
    }
    setUser(user);
    setAppLoading(false);
  };
  const refetchUser = () => fetchUser().then(updateUser).catch(console.log);

  const addToCart = (storeCart) => {
    const copyCart = [...cart];
    updateCart(mergeCarts(copyCart, [storeCart]));
  };
  const removeFromCart = (storeId, barcode) => {
    let copyCart = [...cart];
    const index = copyCart.findIndex((c) => c.id == storeId);
    if ((storeId && !barcode) || copyCart[index].items.length == 1) copyCart.splice(index, 1);
    else copyCart[index].items = copyCart[index].items.filter((i) => i.barcode != barcode);
    updateCart(copyCart, barcode);
  };
  const updateCart = async (cart, barcode) => {
    try {
      if (user) await syncUserCart(cart);
      else window.localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      if (barcode) addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      if (barcode) addMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  useEffect(() => {
    const aThemeMode = Cookies.get("themeMode") || window.localStorage.getItem("themeMode");
    const aCoordinates = Cookies.get("coordinates") || window.localStorage.getItem("coordinates");
    const aRange = Cookies.get("range") || window.localStorage.getItem("range");

    updateThemeMode(aThemeMode || "auto");
    if (aCoordinates) updateCoordinates(aCoordinates.split(":"));
    if (aRange) updateRange(aRange);

    if (window.localStorage.getItem("accessToken")) {
      const cb = (err) => setUser(null) + setAppLoading(false);
      fetchUser().then(updateUser).catch(cb);
    } else {
      setUser(null);
      setAppLoading(false);
    }

    registerServiceWorker();
  }, []);

  const state = {
    setAppLoading,
    addMessage,
    lang,
    updateLang,
    themeMode,
    updateThemeMode,
    coordinates,
    updateCoordinates,
    range,
    updateRange,
    user,
    updateUser,
    refetchUser,
    cart,
    addToCart,
    removeFromCart,
    currency,
  };

  return (
    <AppSessionContext.Provider value={state}>
      {children}
      <ScrollToTopBtn />
      <ImagePreview />
      <Messages messages={messages} setMessages={setMessages} />
      <SelectLanguage />
    </AppSessionContext.Provider>
  );
}
