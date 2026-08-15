const CACHE_NAME =
  "okozukai-cache-v1";

const CACHE_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon.svg"
];

// アプリに必要なファイルを保存する
self.addEventListener(
  "install",
  function (event) {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then(function (cache) {
          return cache.addAll(
            CACHE_FILES
          );
        })
    );

    self.skipWaiting();
  }
);

// 古いキャッシュを削除する
self.addEventListener(
  "activate",
  function (event) {
    event.waitUntil(
      caches
        .keys()
        .then(function (cacheNames) {
          return Promise.all(
            cacheNames.map(
              function (cacheName) {
                if (
                  cacheName !==
                  CACHE_NAME
                ) {
                  return caches.delete(
                    cacheName
                  );
                }
              }
            )
          );
        })
    );

    self.clients.claim();
  }
);

// 通信できるときは最新データを使い、
// 通信できないときは保存済みデータを使う
self.addEventListener(
  "fetch",
  function (event) {
    if (
      event.request.method !== "GET"
    ) {
      return;
    }

    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          const responseCopy =
            response.clone();

          caches
            .open(CACHE_NAME)
            .then(function (cache) {
              cache.put(
                event.request,
                responseCopy
              );
            });

          return response;
        })
        .catch(function () {
          return caches
            .match(event.request)
            .then(function (
              cachedResponse
            ) {
              if (cachedResponse) {
                return cachedResponse;
              }

              if (
                event.request.mode ===
                "navigate"
              ) {
                return caches.match(
                  "./index.html"
                );
              }
            });
        })
    );
  }
);