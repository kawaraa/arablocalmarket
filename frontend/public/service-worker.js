// self.importScripts('foo.js', 'bar.js');

const staticFileCacheName = "static-files-v-09y655e794498568";
// const filesMustCache = /(googleapis|gstatic)|\.(JS|CSS|SVG|PNG|JPG|jPEG|GIF|ICO|JSON)$/gim;
const staticFileCachePaths = ["/", "/offline.html", "/barcode-scanner/quagga.min.js", "/signin", "/signup"];

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
  const networkErrorResponse = Response.error();
  try {
    // !request.url.includes("http")
    // console.log("Caching: >>> ", navigator.onLine, request.method, request.url);
    if (/api|api\/auth|api\/users/gim.test(request.url)) return await fetch(request);
    else {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;

      const response = await fetch(request);
      if (!["GET", "HEAD"].includes(request.method) || !response.ok) return response;

      await caches.open(staticFileCacheName).then((cache) => cache.put(request, response.clone()));
      return response;
    }
  } catch (error) {
    // console.log("caches ERROR: >>>", request.method, request.url, error);
    if (request.method == "GET" && (request.mode == "navigate" || !request.url.includes("api"))) {
      return caches.match(staticFileCachePaths[1]); // offline fallback page
    }
    return networkErrorResponse;
  }
};
