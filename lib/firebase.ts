import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp | null = null;
let database: Database | null = null;
let storage: FirebaseStorage | null = null;

try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    storage = getStorage(app);
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

export { app, database, storage };