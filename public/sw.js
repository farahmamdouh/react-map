
/* ServwceWorker install */
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('NeighborhoodMap').then(function(cache) {
			return cache.addAll([
				`/`,
				'/index.html',
				'/static/js/bundle.js',
				'/static/js/bundle.js.map ',
				'/src/App.js',
				'/src/App.css',
				'/src/index.js',
				'/src/index.css',
				'/src/MyMapComponent.js',
				'/src/App.test.js'
			]).then(() => self.skipWaiting())
		})
	)
})
  
/* ServwceWorker install */
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if(response) 
				return response;
			
			return fetch(event.request);
		})
	);
});
