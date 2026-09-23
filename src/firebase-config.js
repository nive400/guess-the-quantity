// Firebase Realtime Database Configuration
// You can either fill these in here, provide VITE_FIREBASE_* env variables,
// or paste your Firebase project config directly in the in-app "Database Settings" modal!

const storedConfigStr = typeof window !== 'undefined' ? localStorage.getItem('gtq_firebase_config') : null;
let customStoredConfig = null;
try {
  if (storedConfigStr) customStoredConfig = JSON.parse(storedConfigStr);
} catch (e) {
  // ignore json parse error
}

export const defaultFirebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env?.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || ""
};

export const activeFirebaseConfig = customStoredConfig || defaultFirebaseConfig;

export function isFirebaseConfigured() {
  return Boolean(
    activeFirebaseConfig.apiKey &&
    activeFirebaseConfig.databaseURL &&
    !activeFirebaseConfig.databaseURL.includes('your-project-id')
  );
}

export function saveFirebaseConfig(newConfig) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gtq_firebase_config', JSON.stringify(newConfig));
    window.location.reload();
  }
}

export function clearFirebaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('gtq_firebase_config');
    window.location.reload();
  }
}
