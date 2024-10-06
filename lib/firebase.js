import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log('Firebase config:', firebaseConfig);

let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized');
  db = getDatabase(app);
  console.log('Realtime Database instance created');
  auth = getAuth(app);
  console.log('Auth instance created');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { db, auth };