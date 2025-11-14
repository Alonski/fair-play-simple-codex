import { Workbox } from 'workbox-window';

const SERVICE_WORKER_PATH = '/service-worker.js';

export function registerServiceWorker() {
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    return;
  }

  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const wb = new Workbox(SERVICE_WORKER_PATH);
  wb.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      console.info('[service-worker] activated');
    }
  });

  wb.addEventListener('controlling', () => {
    console.info('[service-worker] controlling application');
  });

  wb.addEventListener('waiting', () => {
    console.info('[service-worker] waiting to activate');
  });

  wb.register().catch((error) => {
    console.error('[service-worker] registration failed', error);
  });
}

export function unregisterServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}
