// self.importScripts('foo.js', 'bar.js');

const staticFileCacheName =
  "static-files-v-0njhvb83erwyuqwdbvujpo02i98rt4r79q0djoancbsfyq8e7t6534702q9oapoanf";
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
  console.log("Started Caching: >>> ", navigator.onLine, request.method, request.url);
  try {
    // !request.url.includes("http")
    // console.log("Started Caching: >>> ", navigator.onLine, request.method, request.url);
    if (!["GET", "HEAD"].includes(request.method) || /api|api\/auth|api\/users/gim.test(request.url)) {
      return fetch(request);
    } else {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;
      else if (!navigator.onLine) {
        const res = await caches.match(request.url);
        if (res) return res;
      }

      const response = await fetch(request);
      if (!response.ok || response.type != "basic") return response;

      await caches.open(staticFileCacheName).then((cache) => cache.put(request, response.clone()));
      return response;
    }
  } catch (error) {
    console.log("caches ERROR: >>>", request.method, request.url, error);
    if (request.method == "GET" && (request.mode == "navigate" || !request.url.includes("api"))) {
      return caches.match(staticFileCachePaths[1]); // offline fallback page
    }
    return networkErrorResponse;
  }
};
