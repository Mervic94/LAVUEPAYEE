
// Service Worker pour les notifications push
self.addEventListener('install', (event) => {
  console.log('Service Worker installé');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activé');
  event.waitUntil(self.clients.claim());
});

// Gérer les notifications push
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon || '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: data.data,
    actions: data.actions || [],
    requireInteraction: true,
    tag: 'lavuepayee-notification'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Gérer les clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data;
  const action = event.action;

  if (action === 'view') {
    // Action personnalisée
    event.waitUntil(
      clients.openWindow(data.url || '/')
    );
  } else {
    // Clic par défaut
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Si une fenêtre est déjà ouverte, la focuser
        for (const client of clientList) {
          if (client.url === self.location.origin && 'focus' in client) {
            return client.focus();
          }
        }
        // Sinon ouvrir une nouvelle fenêtre
        return clients.openWindow(data.url || '/');
      })
    );
  }
});

// Gérer la fermeture des notifications
self.addEventListener('notificationclose', (event) => {
  console.log('Notification fermée:', event.notification.data);
  
  // Tracker la fermeture si nécessaire
  if (event.notification.data?.trackingId) {
    fetch('/api/track-notification-close', {
      method: 'POST',
      body: JSON.stringify({
        notificationId: event.notification.data.trackingId,
        action: 'dismissed'
      })
    }).catch(console.error);
  }
});
