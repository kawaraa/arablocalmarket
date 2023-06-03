// self.importScripts('foo.js', 'bar.js');

const staticFileCacheName = "static-files-v-46";
// const filesMustCache = /(googleapis|gstatic)|\.(JS|CSS|SVG|PNG|JPG|jPEG|GIF|ICO|JSON)$/gim;
const staticFileCachePaths = [
  "/",
  // "/offline.html",
  "/barcode-scanner/quagga.min.js",
  "/signin",
  "/signup",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(caches.open(staticFileCacheName).then((cache) => cache.addAll(staticFileCachePaths)));
  self.skipWaiting();
});

self.addEventListener("activate", async (evt) => {
  console.log(staticFileCacheName);
  evt.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => key !== staticFileCacheName && caches.delete(key))))
  );
});

self.addEventListener("fetch", (evt) => evt.respondWith(handleRequest(evt.request)));

const handleRequest = async (request) => {
  // console.log("caches Start", request.method, request.url);
  const networkErrorResponse = Response.error();
  // console.log("caches ERROR: >>>", request.method, request.url);
  try {
    // !request.url.includes("http") ||
    if (/api|api\/auth|api\/users/gim.test(request.url)) {
      // console.log("Caching: >>> ", navigator.onLine, request.method, request.url);
      return await fetch(request);
    } else {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;
      // console.log("Caching: >>> ", navigator.onLine, request.method, request.url);

      const response = await fetch(request);
      if (request.method != "GET" || !response.ok) return response;

      await caches.open(staticFileCacheName).then((cache) => cache.put(request, response.clone()));
      return response;
    }
  } catch (error) {
    // console.log("caches ERROR: >>>", request.method, request.url, error);
    if (request.url.includes("_next")) return caches.match(staticFileCachePaths[1]); // offline fallback page
    return networkErrorResponse;
  }
};
