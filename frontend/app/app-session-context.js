"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "./(service)/cookies";
// import { Validator } from "k-utilities";

export const AppSessionContext = createContext();

export default function AppSessionContextProvider({ children, language, theme }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [lang, setLang] = useState(language);
  const [themeMode, setThemeMode] = useState(theme);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  // localStorage.cart.items.
  const cart = { items: [] };
  const notifications = [
    { title: { en: "aaa", ar: "aaaa" }, description: { en: "aaa", ar: "aaa" }, path: "1" },
  ];

  // const [worker, setWorker] = useState(null);
  // const [showMessage, setShowMessage] = useState("");
  // const [posts, setPosts] = useState([]);
  // const [editingPost, setEditingPost] = useState("");
  // const [conversations, setConversations] = useState([]);
  // const [receivedMessage, setReceivedMessage] = useState({});
  // const [connected, setConnected] = useState(true);
  // const [unseenNotifications, setUnseenNotifications] = useState([]);
  // const [unseenChats, setUnseenChats] = useState([]);

  // const [profile, setProfile] = useState({});
  // const [editingField, setEditingField] = useState("");

  const addMessage = (msg) => setMessages([...messages, msg]);

  const addError = (err) => setErrors([...errors, err]);

  const updateLang = (lang) => {
    Cookies.set("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.classList.remove("en", "ar");
    document.documentElement.classList.add(lang);
    setLang(lang);
  };

  const updateThemeMode = (mode) => {
    document.documentElement.classList.remove("dark", "light", "auto");

    Cookies.set("themeMode", mode);
    if (mode === "auto") document.documentElement.classList.add("auto");
    else document.documentElement.classList.add(mode);
    setThemeMode(mode);
  };

  // const addPost = (post) => setPosts([post, ...posts]); // posts.splice(0, 0, detail);
  // const updatePost = (post) => {
  //   const index = posts.findIndex((p) => p.id === post.id);
  //   if (index > -1) Object.keys(posts[index]).forEach((k) => (posts[index][k] = post[k]));
  //   setPosts(posts);
  // };
  // const removePost = (id) => setPosts(posts.filter((post) => post.id !== id));

  // const popMessage = (message) => {
  //   setShowMessage(message);
  //   setTimeout(() => setShowMessage(""), 2000);
  // };

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

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (Cookies.get("themeMode") === "dark" || dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    updateThemeMode(Cookies.get("themeMode") || themeMode);

    // Todo: here
    const user = JSON.parse(window.localStorage.getItem("user") || null);
    if (!user) {
      // getUser("url").then((user) => user && window.localStorage.getItem("user", JSON.stringify(user)));
    }

    // if (user?.hasStore) router.push("/my");
    // else if (user) router.push("/store");

    window.setLoading(false);
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

  // const addNotification = (notification) => {
  //   const index = unseenNotifications.findIndex((note) => note.id === notification.id);
  //   if (index < 0) setUnseenNotifications([...unseenNotifications, notification]);
  // };
  // const removeNotification = (notification) => {
  //   setUnseenNotifications(unseenNotifications.filter((not) => not.id !== notification.id));
  // };
  // const removeUnseenChat = (id) => setUnseenChats(unseenChats.filter((chat) => chat.id !== id));

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

  const state = {
    loading,
    setLoading,
    messages,
    addMessage,
    errors,
    addError,
    lang,
    updateLang,
    themeMode,
    updateThemeMode,

    user,
    setUser,
    cart,
    notifications,
    // location,
    // setLocation,
    requestNotificationPermission,

    // worker,
    // setWorker,

    // showMessage,
    // popMessage,
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

  return <AppSessionContext.Provider value={state}>{children}</AppSessionContext.Provider>;
}
