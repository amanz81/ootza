import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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

let db;

try {
  const app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
  db = getDatabase(app);
  console.log('Database initialized:', db);

  // Uncomment the following line if you're using Firebase Local Emulator
  // connectDatabaseEmulator(db, 'localhost', 9000);
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { db };