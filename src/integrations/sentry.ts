import * as Sentry from "@sentry/react";

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.warn("[Sentry] VITE_SENTRY_DSN non défini — monitoring désactivé en dev");
    return;
  }

  Sentry.init({
    dsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 0.0,
    replaysSessionSampleRate: import.meta.env.PROD ? 0.05 : 0.0,
    replaysOnErrorSampleRate: import.meta.env.PROD ? 0.5 : 0.0,
    environment: import.meta.env.MODE,
    beforeSend(event) {
      // Ne jamais envoyer en local si pas de DSN
      if (import.meta.env.DEV && !dsn) return null;
      // Masquer les emails dans les extra data
      if (event.user?.email) {
        event.user.email = event.user.email.replace(/(?<=.).(?=.*@)/g, "*");
      }
      return event;
    },
  });
}

export { Sentry };
