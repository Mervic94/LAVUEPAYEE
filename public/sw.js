
// Service Worker pour les notifications push
const CACHE_NAME = 'lavuepayee-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Gestion des requêtes réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let notificationData = {
    title: 'LAVUEPAYEE',
    body: 'Vous avez une nouvelle notification',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'default'
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  const notificationPromise = self.registration.showNotification(
    notificationData.title,
    {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction || false,
      data: notificationData.data,
      actions: notificationData.actions || []
    }
  );

  event.waitUntil(notificationPromise);
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  const clickAction = event.action || 'default';
  let targetUrl = '/dashboard';
  
  if (event.notification.data?.url) {
    targetUrl = event.notification.data.url;
  }
  
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {
    // Chercher si une fenêtre est déjà ouverte
    for (let i = 0; i < windowClients.length; i++) {
      const client = windowClients[i];
      if (client.url.includes(self.location.origin)) {
        return client.focus().then(() => {
          return client.navigate(targetUrl);
        });
      }
    }
    
    // Ouvrir une nouvelle fenêtre si aucune n'est trouvée
    return clients.openWindow(targetUrl);
  });
  
  event.waitUntil(promiseChain);
});

// Gestion de la synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    // Ici on peut synchroniser les données hors ligne
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Logique de synchronisation des données
  return fetch('/api/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'sync',
      timestamp: Date.now()
    })
  }).catch((error) => {
    console.log('Sync failed:', error);
  });
}
