var url =  window.location.href;
var swLocation = '/misitio/serviceWorker.js'

if( navigator.serviceWorker) {
  if(url.includes('localhost')) {
    swLocation = '/serviceWorker.js';
  }
  navigator.serviceWorker.register( swlocation);
}

const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "",
  "index.html",
  "css/style.css",
  "js/app.js",
  "images/Hamborguesa.jpg",
  "images/Pizza.jpg",
  "images/Pollo.jpg",
  "images/Tacos.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
