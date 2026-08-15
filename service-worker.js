// =====================================
// おこづかいメモ
// Service Worker
// Ver. 0.11.0
// =====================================

const CACHE_NAME =
  "okozukai-cache-v0.11.0";

const CACHE_FILES = [
  "./",
  "./index.html",
  "./style.css?v=0.11.0",
  "./script.js?v=0.11.0",
  "./manifest.json?v=0.11.0",
  "./icon.svg?v=0.11.0"
];

self.addEventListener(
  "install",
  function (event) {

    event.waitUntil(
      caches
        .open(
          CACHE_NAME
        )
        .then(
          function (cache) {

            return cache.addAll(
              CACHE_FILES
            );

          }
        )
    );

    self.skipWaiting();

  }
);

self.addEventListener(
  "activate",
  function (event) {

    event.waitUntil(
      caches
        .keys()
        .then(
          function (
            cacheNames
          ) {

            return Promise.all(
              cacheNames.map(
                function (
                  cacheName
                ) {

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

          }
        )
    );

    self.clients.claim();

  }
);

self.addEventListener(
  "fetch",
  function (event) {

    const request =
      event.request;

    if (
      request.method !== "GET"
    ) {
      return;
    }

    const requestUrl =
      new URL(
        request.url
      );

    if (
      requestUrl.origin !==
      self.location.origin
    ) {
      return;
    }

    if (
      request.mode ===
      "navigate"
    ) {

      event.respondWith(
        fetch(
          request
        )
          .then(
            function (
              response
            ) {

              return response;

            }
          )
          .catch(
            function () {

              return caches.match(
                "./index.html"
              );

            }
          )
      );

      return;
    }

    event.respondWith(
      fetch(
        request
      )
        .then(
          function (
            response
          ) {

            if (
              response &&
              response.ok
            ) {

              const copy =
                response.clone();

              caches
                .open(
                  CACHE_NAME
                )
                .then(
                  function (
                    cache
                  ) {

                    cache.put(
                      request,
                      copy
                    );

                  }
                );

            }

            return response;

          }
        )
        .catch(
          function () {

            return caches.match(
              request
            );

          }
        )
    );

  }
);