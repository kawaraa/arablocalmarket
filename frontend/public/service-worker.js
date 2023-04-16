// self.importScripts('foo.js', 'bar.js');

const staticFileCacheName = "static-files-v-12";
// const filesMustCache = /(googleapis|gstatic)|\.(JS|CSS|SVG|PNG|JPG|jPEG|GIF|ICO|JSON)$/gim;
const staticFileCachePaths = [
  "/",
  "/tailwind-css-script.js",
  "/config.js",
  "/barcode-scanner/quagga.min.js",
  // "/offline",
];
// const pushNotificationEvents = ["ADD_NOTIFICATION", "NEW_MESSAGE"];

self.addEventListener("install", (evt) => {
  evt.waitUntil(caches.open(staticFileCacheName).then((cache) => cache.addAll(staticFileCachePaths)));
  self.skipWaiting();
});

self.addEventListener("activate", async (evt) => {
  evt.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => key !== staticFileCacheName && caches.delete(key))))
  );
});

self.addEventListener("fetch", (evt) => {
  // console.log("static-files-v-10: >>>", navigator.onLine, evt.request.url);
  if (
    !evt.request.url.includes("http") ||
    evt.request.url.includes("api/auth") ||
    evt.request.url.includes("api/users") ||
    (evt.request.url.includes("/api/") && navigator.onLine)
  ) {
    evt.respondWith(fetch(evt.request));
  } else {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cachedResponse) => {
          // console.log("Cash: >>>", cachedResponse);
          if (cachedResponse) return cachedResponse;
          return fetch(evt.request).then((response) => {
            // console.log("Before fetch: >>>", evt.request.method, cachedResponse);
            if (evt.request.method != "GET" || !response.ok) return response;
            // console.log("After fetch: >>>", evt.request.method, response);
            return caches.open(staticFileCacheName).then((cache) => {
              cache.put(evt.request, response.clone());
              return response;
            });
          });
        })
        .catch((error) => {
          // console.log("caches.match ERROR: >>>", error);

          caches.match(staticFileCachePaths[0]);
        }) // offline fallback page
    );
  }
});

// self.addEventListener("message", (evt) => {
//   // evt.source is the page client who sent the message
//   switch (evt.data.type) {
//     case "SET_NOTIFICATIONS_PERMISSION":
//       self.notifications = evt.data.message.mode;
//       break;
//     case "SET_URL_SOCKET":
//       self.socketUrl = evt.data.message.url;
//       establishSocketConnection();
//       break;
//     default:
//       console.log("Event type: ", evt.data.type);
//   }
// });

// self.addEventListener("notificationclick", (evt) => {
//   if (clients.openWindow) clients.openWindow("/" + evt.notification.data.url);
//   evt.notification.close();
//   // clients.focus();
// });

// const parseJSON = (data) => {
//   try {
//     const json = JSON.parse(data);
//     return json;
//   } catch (e) {}
//   return data;
// };
// const toJSON = (data) => {
//   try {
//     const json = JSON.stringify(data);
//     return json;
//   } catch (e) {}
//   return data;
// };
// const getFocusedClients = async () => {
//   try {
//     return clients.matchAll({ includeUncontrolled: true, type: "window" }).then((clients) => {
//       return clients.filter((client) => client.visibilityState === "visible");
//     });
//   } catch (error) {
//     return [];
//   }
// };

// const establishSocketConnection = async () => {
//   const focusedClients = await getFocusedClients();
//   focusedClients.forEach((client) => client.postMessage({ type: "DISCONNECT" }));

//   if (!navigator.onLine) return setTimeout(() => establishSocketConnection(), 15000);

//   if (self.socket && self.socket.readyState === 1) {
//     return focusedClients.forEach((client) => client.postMessage({ type: "CONNECT" }));
//   }
//   self.socket = new WebSocket(self.socketUrl);
//   self.socket.onmessage = handleMessages;

//   self.socket.onclose = (e) => setTimeout(() => establishSocketConnection(), 2000);
//   self.socket.onerror = (e) => console.log("Socket Connection Error: ", e);
//   self.socket.onopen = (e) => {
//     focusedClients.forEach((client) => client.postMessage({ type: "CONNECT" }));
//     clearInterval(self.socketTimer);
//     self.socketTimer = setInterval(
//       () => self.socket.readyState === 1 && self.socket.send(toJSON({ type: "PING", message: {} })),
//       60000
//     );
//   };
// };

// const handleMessages = async (evt) => {
//   const data = parseJSON(evt.data);
//   const focusedClients = await getFocusedClients();

//   focusedClients.forEach((client) => client.postMessage(data));
// if (!pushNotificationEvents.find((evt) => evt === data.type)) return;

//   if (Notification.permission === "granted" && self.notifications === "on" && !focusedClients[0]) {
//     const notification = getNotifications(data);
//     if (notification) self.registration.showNotification(notification.title, notification.body);
//   }
// };

// const getNotifications = (evt) => {
//   // console.log("Preparing the notification: ", evt);

//   let title = "",
//     text = "",
//     icon = "/image/favicon/android-chrome-512x512.png",
//     tag = Math.random() + "",
//     url = "";
//   switch (evt.type) {
//     case "ADD_NOTIFICATION":
//       title = "Join request";
//       text = evt.message.text.replace("]", "");
//       url = `?notification=show`;
//       tag = evt.message.id;
//       break;
//     case "NEW_MESSAGE":
//       title = "New message";
//       text = `There are new messages in ${evt.message.activity} group`;
//       url = `?group=${evt.message.chatId}`;
//       tag = evt.message.chatId;
//       break;
//     default:
//       // console.log("Unknown message: ", data);
//       return undefined;
//   }

//   return { title, body: { tag, body: text, icon, data: { url } } };
// };

/**
 * clients object:
 const clientObject = {
  focused: false,
  frameType: "top-level",
  id: "7653ddbc-df52-4f18-8ebc-81a383998472",
  type: "window",
  url: "http://localhost:8080/settings",
  visibilityState: "visible",
};
 * 
 * 
 * Possible values of Notification Option:
 const options = {
   "//": "Visual Options",
   body: "<String>",
   icon: "<URL String>",
   image: "<URL String>",
   badge: "<URL String>",
   vibrate: "<Array of Integers>",
   sound: "<URL String>",
   dir: "<String of 'auto' | 'ltr' | 'rtl'>",
   "//": "Behavioural Options",
   tag: "<String>",
   data: "<Anything>",
   requireInteraction: "<boolean>",
   renotify: "<Boolean>",
   silent: "<Boolean>",
   "//": "Both Visual & Behavioural Options",
   actions: "<Array of Strings>",
   "//": "Information Option. No visual affect.",
   timestamp: "<Long>",
  };
  
  */
