const STATIC_CACHE = "citadel-static-v1";
const RUNTIME_CACHE = "citadel-runtime-v1";

const PRECACHE_URLS = [
  "/",
  "/offline.html",
  "/favicon.ico",
  "/manifest.webmanifest",
  "/Citadel.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) =>
            [STATIC_CACHE, RUNTIME_CACHE].includes(key)
              ? Promise.resolve()
              : caches.delete(key),
          ),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Skip API calls
  if (url.pathname.startsWith("/api")) return;

  // Navigation: network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/offline.html")),
    );
    return;
  }

  // Cache-first for Next.js assets and static files
  if (
    url.pathname.startsWith("/_next") ||
    /\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|mp3|wav)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      }),
    );
    return;
  }

  // Stale-while-revalidate for other GET requests
  event.respondWith(
    caches.open(RUNTIME_CACHE).then(async (cache) => {
      try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      } catch {
        const cached = await cache.match(request);
        return cached || Promise.reject("no-match");
      }
    }),
  );
});