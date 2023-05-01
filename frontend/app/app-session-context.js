"use client";
import React, { createContext, useState, useEffect } from "react";
import Messages from "./(component)/(styled)/messages";
import { fetchUser, registerServiceWorker } from "./(service)/api-provider";
import { Cookies } from "./(service)/utilities";
import ImagePreview from "./(component)/(styled)/image-preview";
// import { Validator } from "k-utilities";

export const AppSessionContext = createContext();

export default function AppSessionContextProvider({ children, language, theme }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [lang, setLang] = useState(language);
  const [themeMode, setThemeMode] = useState(theme);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [range, setRange] = useState(1.5);
  const [user, setUser] = useState(null);

  // localStorage.cart.items.
  const cart = { items: [] };

  // const [worker, setWorker] = useState(null);
  // const [posts, setPosts] = useState([]);
  // const [editingPost, setEditingPost] = useState("");
  // const [conversations, setConversations] = useState([]);
  // const [receivedMessage, setReceivedMessage] = useState({});
  // const [connected, setConnected] = useState(true);
  // const [unseenNotifications, setUnseenNotifications] = useState([]);
  // const [unseenChats, setUnseenChats] = useState([]);

  // const [profile, setProfile] = useState({});
  // const [editingField, setEditingField] = useState("");

  const setAppLoading = (loading) => window?.setLoading(loading);
  const addMessage = (msg) => setMessages([...messages, msg]);

  const updateLang = (lang) => {
    Cookies.set("lang", lang);
    window.localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.classList.remove("en", "ar");
    document.documentElement.classList.add(lang);
    setLang(lang);
  };
  const updateThemeMode = (mode) => {
    Cookies.set("themeMode", mode);
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

  // const addPost = (post) => setPosts([post, ...posts]); // posts.splice(0, 0, detail);
  // const updatePost = (post) => {
  //   const index = posts.findIndex((p) => p.id === post.id);
  //   if (index > -1) Object.keys(posts[index]).forEach((k) => (posts[index][k] = post[k]));
  //   setPosts(posts);
  // };
  // const removePost = (id) => setPosts(posts.filter((post) => post.id !== id));

  // const openConversation = (conversation) => {
  //   const index = conversations.findIndex((con) => con.id === conversation.id);
  //   removeUnseenChat(conversation.id);
  //   if (index > -1) return;
  //   conversation.messages = [];
  //   setConversations([...conversations, conversation]);
  // };
  // const closeConversation = (id) => {
  //   setConversations(conversations.filter((con) => con.id !== id));
  // };
  // const updateConversationMessages = (conversation) => {
  //   const conversationsCopy = [...conversations];
  //   conversationsCopy.forEach((con) => {
  //     if (con.id === conversation.id) con.messages = conversation.messages;
  //   });
  //   setConversations(conversationsCopy);
  // };

  // const addNotification = (notification) => {
  //   const index = unseenNotifications.findIndex((note) => note.id === notification.id);
  //   if (index < 0) setUnseenNotifications([...unseenNotifications, notification]);
  // };
  // const removeNotification = (notification) => {
  //   setUnseenNotifications(unseenNotifications.filter((not) => not.id !== notification.id));
  // };
  // const removeUnseenChat = (id) => setUnseenChats(unseenChats.filter((chat) => chat.id !== id));

  const updateUser = (user) => {
    setAppLoading(true);
    setLoading(true);
    if (user) window.localStorage.setItem("user", JSON.stringify(user));
    else window.localStorage.removeItem("user");
    setUser(user);
    setLoading(false);
    setAppLoading(false);
  };

  const requestNotificationPermission = () => {
    const error = "Notifications are not supported";
    return new Promise((resolve, reject) => {
      if (!Notification || typeof Notification.requestPermission !== "function") reject(error);
      if (Notification.permission === "granted") return resolve(Notification.permission);
      try {
        Notification.requestPermission().then(resolve).catch(reject);
      } catch (error) {
        // Safari doesn't return a promise for requestPermissions and it throws a Error. instead it takes a callback.
        Notification.requestPermission((res) => (res ? resolve(res) : reject(res)));
      }
    });
  };

  useEffect(() => {
    const aLang = Cookies.get("lang") || window.localStorage.getItem("lang");
    const aThemeMode = Cookies.get("themeMode") || window.localStorage.getItem("themeMode");
    const aCoordinates = Cookies.get("coordinates") || window.localStorage.getItem("coordinates");
    const aRange = Cookies.get("range") || window.localStorage.getItem("range");

    updateThemeMode(aThemeMode || "auto");
    if (aLang) updateLang(aLang);
    if (aCoordinates) updateCoordinates(aCoordinates.split(":"));
    if (aRange) updateRange(aRange);

    fetchUser()
      .then(updateUser)
      .catch((err) => {
        const user = JSON.parse(window.localStorage.getItem("user") || null);
        if (user) return updateUser(user);
        setLoading(false);
        setAppLoading(false);
      });

    registerServiceWorker();
  }, []);

  // useEffect(() => {
  //   const conversationsCopy = [...conversations];
  //   const index = conversationsCopy.findIndex((conversation) => conversation.id === receivedMessage.chatId);
  //   if (index < 0) setUnseenChats([...unseenChats, { id: receivedMessage.chatId }]);
  //   else {
  //     conversationsCopy[index].messages.unshift(receivedMessage);
  //     setConversations(conversationsCopy);
  //   }
  // }, [receivedMessage]);

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
    cart,
    requestNotificationPermission,

    // worker,
    // setWorker,
    // posts,
    // setPosts,
    // addPost,
    // updatePost,
    // removePost,
    // editingPost,
    // setEditingPost,
    // conversations,
    // openConversation,
    // closeConversation,
    // updateConversationMessages,
    // receivedMessage,
    // setReceivedMessage,
    // connected,
    // setConnected,
    // unseenNotifications,
    // setUnseenNotifications,
    // addNotification,
    // removeNotification,
    // unseenChats,
    // setUnseenChats,
    // removeUnseenChat,
    // editingField,
    // setEditingField,
    // profile,
    // setProfile,
  };

  if (loading) return null;
  return (
    <AppSessionContext.Provider value={state}>
      {children}
      <ImagePreview />
      <Messages messages={messages} setMessages={setMessages} />
    </AppSessionContext.Provider>
  );
}

// const notifications = [
//   { type: "NEW_ORDER", seen: false, meta: { path: "1" } },
//   { type: "DELIVERED", seen: false, meta: { path: "1" } },
// ];
// const ur = { firstName: "Mr", lastName: "Tester", admin: true, notifications };
